from datetime import datetime, date
from config.database import db
from bson import ObjectId

class SpeechPractice:
    collection = db.speech_practice
    
    @staticmethod
    def create(child_name, practice_data):
        """Create a new speech practice record"""
        data = {
            'child_name': child_name,
            'score': practice_data.get('score'),
            'total_questions': practice_data.get('totalQuestions'),
            'questions_attempted': practice_data.get('questionsAttempted'),
            'date': datetime.utcnow().date().isoformat(),  # Store as ISO date string
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = SpeechPractice.collection.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return data
    
    @staticmethod
    def find_by_child_and_date(child_name, date_str=None):
        """Find speech practice record for a child on a specific date (defaults to today)"""
        if date_str is None:
            date_str = datetime.utcnow().date().isoformat()
        
        practice = SpeechPractice.collection.find_one({
            'child_name': child_name,
            'date': date_str
        })
        
        if practice:
            practice['_id'] = str(practice['_id'])
        return practice
    
    @staticmethod
    def find_by_child(child_name, limit=30):
        """Find all speech practice records for a child"""
        practices = SpeechPractice.collection.find(
            {'child_name': child_name}
        ).sort('created_at', -1).limit(limit)
        
        result = []
        for practice in practices:
            practice['_id'] = str(practice['_id'])
            result.append(practice)
        return result
    
    @staticmethod
    def update(practice_id, update_data):
        """Update a speech practice record"""
        try:
            update_data['updated_at'] = datetime.utcnow()
            result = SpeechPractice.collection.update_one(
                {'_id': ObjectId(practice_id)},
                {'$set': update_data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def delete(practice_id):
        """Delete a speech practice record"""
        try:
            result = SpeechPractice.collection.delete_one({'_id': ObjectId(practice_id)})
            return result.deleted_count > 0
        except:
            return False
