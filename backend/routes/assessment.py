from flask import Blueprint, request, jsonify, session
from controllers.assessment_controller import AssessmentController
from controllers.auth_controller import AuthController
from utils.decorators import requires_auth

assessment_bp = Blueprint('assessment', __name__)

@assessment_bp.route('/', methods=['POST'])
@requires_auth
def create_assessment():
    """Create a new assessment"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Get parent auth0_id from session
        parent_auth0_id = AuthController.get_session_auth0_id()
        if not parent_auth0_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Create assessment
        assessment, error = AssessmentController.create_assessment(data, parent_auth0_id)
        
        if error:
            return jsonify({'error': error}), 400
        
        # Format response
        response = AssessmentController.format_assessment_response(assessment)
        
        return jsonify({
            'message': 'Assessment created successfully',
            'assessment': response
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assessment_bp.route('/', methods=['GET'])
@requires_auth
def get_assessments():
    """Get all assessments for the authenticated parent"""
    try:
        # Get parent auth0_id from session
        parent_auth0_id = AuthController.get_session_auth0_id()
        if not parent_auth0_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Get pagination parameters
        limit = request.args.get('limit', 100, type=int)
        skip = request.args.get('skip', 0, type=int)
        
        # Get assessments
        assessments, error = AssessmentController.get_assessments_by_parent(
            parent_auth0_id, limit, skip
        )
        
        if error:
            return jsonify({'error': error}), 400
        
        # Format response
        formatted_assessments = [
            AssessmentController.format_assessment_response(a) for a in assessments
        ]
        
        return jsonify({
            'assessments': formatted_assessments,
            'count': len(formatted_assessments)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assessment_bp.route('/<assessment_id>', methods=['GET'])
@requires_auth
def get_assessment(assessment_id):
    """Get a specific assessment"""
    try:
        # Get parent auth0_id from session
        parent_auth0_id = AuthController.get_session_auth0_id()
        if not parent_auth0_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Get assessment
        assessment, error = AssessmentController.get_assessment_by_id(
            assessment_id, parent_auth0_id
        )
        
        if error:
            return jsonify({'error': error}), 404 if error == "Assessment not found" else 403
        
        # Format response
        response = AssessmentController.format_assessment_response(assessment)
        
        return jsonify({'assessment': response}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assessment_bp.route('/child/<child_name>', methods=['GET'])
@requires_auth
def get_child_assessments(child_name):
    """Get all assessments for a specific child"""
    try:
        # Get parent auth0_id from session
        parent_auth0_id = AuthController.get_session_auth0_id()
        if not parent_auth0_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Get assessments
        assessments, error = AssessmentController.get_assessments_by_child(
            parent_auth0_id, child_name
        )
        
        if error:
            return jsonify({'error': error}), 400
        
        # Format response
        formatted_assessments = [
            AssessmentController.format_assessment_response(a) for a in assessments
        ]
        
        return jsonify({
            'childName': child_name,
            'assessments': formatted_assessments,
            'count': len(formatted_assessments)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assessment_bp.route('/<assessment_id>', methods=['PUT'])
@requires_auth
def update_assessment(assessment_id):
    """Update an assessment"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Get parent auth0_id from session
        parent_auth0_id = AuthController.get_session_auth0_id()
        if not parent_auth0_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Update assessment
        success, error = AssessmentController.update_assessment(
            assessment_id, parent_auth0_id, data
        )
        
        if not success:
            return jsonify({'error': error}), 404 if error == "Assessment not found" else 403
        
        return jsonify({'message': 'Assessment updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assessment_bp.route('/<assessment_id>', methods=['DELETE'])
@requires_auth
def delete_assessment(assessment_id):
    """Delete an assessment"""
    try:
        # Get parent auth0_id from session
        parent_auth0_id = AuthController.get_session_auth0_id()
        if not parent_auth0_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Delete assessment
        success, error = AssessmentController.delete_assessment(
            assessment_id, parent_auth0_id
        )
        
        if not success:
            return jsonify({'error': error}), 404 if error == "Assessment not found" else 403
        
        return jsonify({'message': 'Assessment deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
