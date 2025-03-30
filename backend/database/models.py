from pydantic import BaseModel

class petitions(BaseModel):
    name: str
    address: str
    gender: str
    adhar: str
    subject: str
    description: str
    file_url: str
    department: str = "Uncategorized"
    priority: str = "Moderate"  # Default priority
    status: str = "Pending"  # Default status is Pending

class AdminLogin(BaseModel):
    admin_id: str
    password: str
