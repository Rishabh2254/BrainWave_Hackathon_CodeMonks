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
    
    @property
    def assessments(self):
        return self.db.assessments
    
    @property
    def speech_practice(self):
        return self.db.speech_practice
    
    @property
    def reports(self):
        return self.db.reports
    
    @property
    def daily_schedule_activities(self):
        return self.db.daily_schedule_activities
    
    def close(self):
        self.client.close()

# Initialize database
db = Database()
