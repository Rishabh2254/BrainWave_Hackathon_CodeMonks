from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class Database:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.client = MongoClient(os.getenv('MONGODB_URI'))
            cls._instance.db = cls._instance.client.get_database('brainwave_db')
        return cls._instance
    
    @property
    def users(self):
        return self.db.users
    
    def close(self):
        self.client.close()

# Initialize database
db = Database()
