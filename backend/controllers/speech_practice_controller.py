from models.speech_practice import SpeechPractice
from datetime import datetime

class SpeechPracticeController:
    @staticmethod
    def create_practice(child_name, practice_data):
        """Create a new speech practice record"""
        try:
            # Validate required fields
            required_fields = ['score', 'totalQuestions']
            for field in required_fields:
                if field not in practice_data:
                    return None, f"Missing required field: {field}"
            
            # Check if already completed today
            today_practice = SpeechPractice.find_by_child_and_date(child_name)
            if today_practice:
                return None, "Already completed today"
            
            # Create practice record
            practice = SpeechPractice.create(child_name, practice_data)
            return practice, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_today_practice(child_name):
        """Get today's speech practice for a child"""
        try:
            practice = SpeechPractice.find_by_child_and_date(child_name)
            return practice, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_practices_by_child(child_name, limit=30):
        """Get all speech practice records for a child"""
        try:
            practices = SpeechPractice.find_by_child(child_name, limit)
            return practices, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def update_practice(practice_id, update_data):
        """Update a speech practice record"""
        try:
            success = SpeechPractice.update(practice_id, update_data)
            if success:
                return {"message": "Practice updated successfully"}, None
            return None, "Failed to update practice"
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def delete_practice(practice_id):
        """Delete a speech practice record"""
        try:
            success = SpeechPractice.delete(practice_id)
            if success:
                return {"message": "Practice deleted successfully"}, None
            return None, "Failed to delete practice"
        except Exception as e:
            return None, str(e)
