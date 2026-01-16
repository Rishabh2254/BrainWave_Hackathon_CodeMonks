from datetime import datetime
from config.database import db
from bson import ObjectId

class User:
    collection = db.users
    
    @staticmethod
    def create(auth0_id, email, name=None, picture=None):
        """Create a new user in MongoDB"""
        user_data = {
            'auth0_id': auth0_id,
            'email': email,
            'name': name,
            'picture': picture,
            'email_verified': False,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = User.collection.insert_one(user_data)
        user_data['_id'] = str(result.inserted_id)
        return user_data
    
    @staticmethod
    def find_by_auth0_id(auth0_id):
        """Find user by Auth0 ID"""
        user = User.collection.find_one({'auth0_id': auth0_id})
        if user:
            user['_id'] = str(user['_id'])
        return user
    
    @staticmethod
    def find_by_email(email):
        """Find user by email"""
        user = User.collection.find_one({'email': email})
        if user:
            user['_id'] = str(user['_id'])
        return user
    
    @staticmethod
    def update(auth0_id, update_data):
        """Update user information"""
        update_data['updated_at'] = datetime.utcnow()
        result = User.collection.update_one(
            {'auth0_id': auth0_id},
            {'$set': update_data}
        )
        return result.modified_count > 0
    
    @staticmethod
    def find_or_create(auth0_id, email, name=None, picture=None, email_verified=False):
        """Find existing user or create new one"""
        user = User.find_by_auth0_id(auth0_id)
        
        if user:
            update_data = {}
            if name and user.get('name') != name:
                update_data['name'] = name
            if picture and user.get('picture') != picture:
                update_data['picture'] = picture
            if user.get('email_verified') != email_verified:
                update_data['email_verified'] = email_verified
            
            if update_data:
                User.update(auth0_id, update_data)
                user.update(update_data)
            
            return user
        else:
            return User.create(auth0_id, email, name, picture)
    
    @staticmethod
    def delete(auth0_id):
        """Delete a user"""
        result = User.collection.delete_one({'auth0_id': auth0_id})
        return result.deleted_count > 0
    
    @staticmethod
    def get_all(limit=100, skip=0):
        """Get all users with pagination"""
        users = list(User.collection.find().limit(limit).skip(skip))
        for user in users:
            user['_id'] = str(user['_id'])
        return users
