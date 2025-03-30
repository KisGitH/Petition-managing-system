from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import gridfs

# MongoDB connection
uri = "mongodb+srv://xxxxxxxxxxxxxxxxxxxxx@cluster0.a0gih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.petition_db

# Collections
collection = db["petitions"]
admin_collection = db["admin"]

# GridFS for file storage
fs = gridfs.GridFS(db)
