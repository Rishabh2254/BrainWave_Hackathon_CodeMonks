from flask import Blueprint, request, jsonify
from controllers.daily_schedule_controller import DailyScheduleController

daily_schedule_bp = Blueprint('daily_schedule', __name__)

@daily_schedule_bp.route('/activity', methods=['POST'])
def save_activity():
    """Save a completed daily schedule activity"""
    try:
        data = request.get_json()
        activity, error = DailyScheduleController.save_activity(data)
        
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify({
            'message': 'Activity saved successfully',
            'activity': activity
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@daily_schedule_bp.route('/today/<child_name>', methods=['GET'])
def get_today_activities(child_name):
    """Get today's activities for a child"""
    try:
        summary, error = DailyScheduleController.get_today_activities(child_name)
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify(summary), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@daily_schedule_bp.route('/range/<child_name>', methods=['GET'])
def get_activities_by_range(child_name):
    """Get activities for a child within a date range"""
    try:
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        if not start_date or not end_date:
            return jsonify({'error': 'start_date and end_date are required'}), 400
        
        activities, error = DailyScheduleController.get_activities_by_date_range(
            child_name, start_date, end_date
        )
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify({'activities': activities}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
