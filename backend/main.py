from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from configuration import collection, fs
from database.schemas import all_Petitions
from database.models import petitions
from bson.objectid import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from ai_model import analyze_priority
from configuration import admin_collection
from database.models import AdminLogin
from passlib.context import CryptContext


app = FastAPI()
router = APIRouter()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Predefined department categories based on keywords
department_keywords = {
    "Health": ["hospital", "doctor", "medicine", "healthcare", "clinic", "treatment", "emergency", "nurse", "surgery", "wellness"],
    "Education": ["school", "college", "university", "teacher", "student", "classroom", "exam", "curriculum", "lecture", "degree"],
    "Water Resource": ["water", "pipeline", "drainage", "sanitation", "tap water", "reservoir", "water treatment", "filter", "well", "irrigation"],
    "Electricity": ["power", "electricity", "transformer", "wiring", "short circuit", "generator", "voltage", "circuit", "conductor", "distribution"],
    "Agriculture": ["farm", "crop", "harvest", "irrigation", "fertilizer", "soil", "pesticide", "tractor", "plowing", "agriculture"],
    "Environment": ["climate", "pollution", "ecosystem", "biodiversity", "recycling", "deforestation", "conservation", "greenhouse", "waste", "sustainability"],
    "Public": ["government", "public service", "citizen", "policy", "community", "public health", "public safety", "social welfare", "law", "rights"],
    "Transport": ["bus", "train", "car", "subway", "airplane", "vehicle", "traffic", "road", "logistics", "freight"]
}


def categorize_petition(description: str):
    """Categorize a petition based on its description."""
    for department, keywords in department_keywords.items():
        if any(keyword.lower() in description.lower() for keyword in keywords):
            return department
    return "Public"  # Default department if no match is found

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

@router.post("/api/upload/")
async def upload_image(file: UploadFile = File(...)):
    try:
        file_id = fs.put(file.file, filename=file.filename, content_type=file.content_type)
        return {"status_code": 200, "file_id": str(file_id), "message": "Image uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading image: {e}")

@router.get("/api/image/{file_id}")
async def get_image(file_id: str):
    try:
        file = fs.get(ObjectId(file_id))
        return {"filename": file.filename, "content_type": file.content_type, "data": file.read()}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Image not found")

@router.get("/api/")
async def get_all_petitions():
    data = collection.find()
    petitions_list = all_Petitions(data)
    
    for petition in petitions_list:
        petition["department"] = categorize_petition(petition["description"])
    
    return petitions_list

  # Import AI model for priority detection

@router.post("/api/")
async def create_petition(new_petition: petitions):
    try:
        petition_data = dict(new_petition)
        petition_data["department"] = categorize_petition(new_petition.description)
        petition_data["priority"] = analyze_priority(new_petition.description)  # AI-based priority

        resp = collection.insert_one(petition_data)
        return {
            "status_code": 200,
            "_id": str(resp.inserted_id),
            "department": petition_data["department"],
            "priority": petition_data["priority"],
            "message": "Successfully Created"
        }
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occurred: {e}")

@router.put("/api/{petition_id}")
async def update_petition(petition_id: str, updated_petition: petitions):
    try:
        id = ObjectId(petition_id)
        existing_doc = collection.find_one({"_id": id})
        if not existing_doc:
            return HTTPException(status_code=404, detail=f"Petition does not exist")
        
        updated_data = dict(updated_petition)
        updated_data["department"] = categorize_petition(updated_petition.description)
        updated_data["priority"] = analyze_priority(updated_petition.description)  # AI-based priority

        collection.update_one({"_id": id}, {"$set": updated_data})
        return {"status_code": 200, "message": "Petition Updated Successfully"}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occurred {e}")


@router.delete("/api/{petition_id}")
async def delete_petition(petition_id: str):
    try:
        id = ObjectId(petition_id)
        existing_doc = collection.find_one({"_id": id})
        if not existing_doc:
            return HTTPException(status_code=404, detail=f"Petition does not exist")
        collection.delete_one({"_id": id})
        return {"status_code": 200, "message": "Petition Deleted Successfully"}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occurred {e}")

@router.put("/api{petition_id}/status")
async def update_petition_status(petition_id: str, updated_data: dict):
    try:
        id = ObjectId(petition_id)
        existing_doc = collection.find_one({"_id": id})
        if not existing_doc:
            raise HTTPException(status_code=404, detail="Petition does not exist")

        if "status" not in updated_data:
            raise HTTPException(status_code=400, detail="Missing 'status' field")

        collection.update_one({"_id": id}, {"$set": {"status": updated_data["status"]}})
        return {"status_code": 200, "message": "Petition status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating petition: {e}")


# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Function to verify passwords
def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Admin Registration API
@router.post("/api/admin/register")
async def register_admin(admin: AdminLogin):
    existing_admin = admin_collection.find_one({"admin_id": admin.admin_id})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin ID already exists")

    hashed_password = hash_password(admin.password)
    admin_data = {"admin_id": admin.admin_id, "password": hashed_password}
    admin_collection.insert_one(admin_data)
    
    return {"status_code": 200, "message": "Admin Registered Successfully"}

# Admin Login API
@router.post("/api/admin/login")
async def login_admin(admin: AdminLogin):
    admin_data = admin_collection.find_one({"admin_id": admin.admin_id})
    if not admin_data:
        raise HTTPException(status_code=400, detail="Invalid Admin ID")

    if not verify_password(admin.password, admin_data["password"]):
        raise HTTPException(status_code=400, detail="Incorrect Password")

    return {"status_code": 200, "message": "Login Successful"}



app.include_router(router)  