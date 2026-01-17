from models.daily_schedule_activity import DailyScheduleActivity

class DailyScheduleController:
    @staticmethod
    def save_activity(activity_data):
        """Save a completed daily schedule activity"""
        try:
            # Validate required fields
            required_fields = ['child_name', 'preset_type', 'task_id', 'task_title']
            for field in required_fields:
                if field not in activity_data:
                    return None, f"Missing required field: {field}"
            
            activity = DailyScheduleActivity.create(activity_data)
            return activity, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_today_activities(child_name):
        """Get all activities completed today by a child"""
        try:
            summary = DailyScheduleActivity.get_today_summary(child_name)
            return summary, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_activities_by_date_range(child_name, start_date, end_date):
        """Get activities for a child within a date range"""
        try:
            activities = DailyScheduleActivity.find_by_child_date_range(child_name, start_date, end_date)
            return activities, None
        except Exception as e:
            return None, str(e)
