from flask import Blueprint, request, jsonify
from controllers.speech_practice_controller import SpeechPracticeController

speech_practice_bp = Blueprint('speech_practice', __name__)

@speech_practice_bp.route('/', methods=['POST'], strict_slashes=False)
def create_practice():
    """Create a new speech practice record"""
    try:
        data = request.get_json()
        child_name = data.get('childName')
        
        if not child_name:
            return jsonify({'error': 'Child name is required'}), 400
        
        practice, error = SpeechPracticeController.create_practice(child_name, data)
        
        if error:
            if error == "Already completed today":
                return jsonify({'error': error, 'code': 'ALREADY_COMPLETED'}), 409
            return jsonify({'error': error}), 400
        
        return jsonify(practice), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@speech_practice_bp.route('/today/<child_name>', methods=['GET'], strict_slashes=False)
def get_today_practice(child_name):
    """Get today's speech practice for a child"""
    try:
        practice, error = SpeechPracticeController.get_today_practice(child_name)
        
        if error:
            return jsonify({'error': error}), 500
        
        if not practice:
            return jsonify({'completed': False}), 200
        
        return jsonify({'completed': True, 'data': practice}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@speech_practice_bp.route('/child/<child_name>', methods=['GET'], strict_slashes=False)
def get_practices_by_child(child_name):
    """Get all speech practice records for a child"""
    try:
        limit = request.args.get('limit', 30, type=int)
        practices, error = SpeechPracticeController.get_practices_by_child(child_name, limit)
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify(practices), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@speech_practice_bp.route('/<practice_id>', methods=['PUT'], strict_slashes=False)
def update_practice(practice_id):
    """Update a speech practice record"""
    try:
        data = request.get_json()
        result, error = SpeechPracticeController.update_practice(practice_id, data)
        
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@speech_practice_bp.route('/<practice_id>', methods=['DELETE'], strict_slashes=False)
def delete_practice(practice_id):
    """Delete a speech practice record"""
    try:
        result, error = SpeechPracticeController.delete_practice(practice_id)
        
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
