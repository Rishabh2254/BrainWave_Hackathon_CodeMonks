from datetime import datetime
from config.database import db
from bson import ObjectId

class DailyScheduleActivity:
    collection = db.daily_schedule_activities
    
    @staticmethod
    def create(activity_data):
        """Create a new daily schedule activity completion"""
        data = {
            'child_name': activity_data.get('child_name'),
            'preset_type': activity_data.get('preset_type'),
            'task_id': activity_data.get('task_id'),
            'task_title': activity_data.get('task_title'),
            'task_emoji': activity_data.get('task_emoji'),
            'completed_at': datetime.utcnow(),
            'date': datetime.utcnow().date().isoformat(),
            'created_at': datetime.utcnow()
        }
        
        result = DailyScheduleActivity.collection.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return data
    
    @staticmethod
    def find_by_child_and_date(child_name, date_str=None):
        """Find all activities for a child on a specific date"""
        if date_str is None:
            date_str = datetime.utcnow().date().isoformat()
        
        activities = DailyScheduleActivity.collection.find({
            'child_name': child_name,
            'date': date_str
        }).sort('completed_at', 1)
        
        result = []
        for activity in activities:
            activity['_id'] = str(activity['_id'])
            result.append(activity)
        return result
    
    @staticmethod
    def get_today_summary(child_name):
        """Get summary of today's activities"""
        date_str = datetime.utcnow().date().isoformat()
        activities = DailyScheduleActivity.find_by_child_and_date(child_name, date_str)
        
        return {
            'date': date_str,
            'total_completed': len(activities),
            'activities': activities
        }
    
    @staticmethod
    def find_by_child_date_range(child_name, start_date, end_date):
        """Find all activities for a child within a date range"""
        activities = DailyScheduleActivity.collection.find({
            'child_name': child_name,
            'date': {'$gte': start_date, '$lte': end_date}
        }).sort('completed_at', 1)
        
        result = []
        for activity in activities:
            activity['_id'] = str(activity['_id'])
            result.append(activity)
        return result
