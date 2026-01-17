from flask import Blueprint, request, jsonify, session
from controllers.report_controller import ReportController
from utils.decorators import requires_auth

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate/<assessment_id>', methods=['POST'], strict_slashes=False)
@requires_auth
def generate_report(assessment_id):
    """Generate a report for an assessment"""
    try:
        parent_auth0_id = session.get('user', {}).get('userinfo', {}).get('sub')
        if not parent_auth0_id:
            return jsonify({'error': 'User not authenticated'}), 401
        
        report, error = ReportController.generate_report(assessment_id, parent_auth0_id)
        
        if error:
            if error == "Unauthorized":
                return jsonify({'error': error}), 403
            return jsonify({'error': error}), 400
        
        return jsonify(report), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@report_bp.route('/assessment/<assessment_id>', methods=['GET'], strict_slashes=False)
@requires_auth
def get_report_by_assessment(assessment_id):
    """Get report for a specific assessment"""
    try:
        parent_auth0_id = session.get('user', {}).get('userinfo', {}).get('sub')
        if not parent_auth0_id:
            return jsonify({'error': 'User not authenticated'}), 401
        
        report, error = ReportController.get_report_by_assessment(assessment_id, parent_auth0_id)
        
        if error:
            if error == "Report not found":
                return jsonify({'exists': False}), 200
            if error == "Unauthorized":
                return jsonify({'error': error}), 403
            return jsonify({'error': error}), 400
        
        return jsonify({'exists': True, 'report': report}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@report_bp.route('/', methods=['GET'], strict_slashes=False)
@requires_auth
def get_reports():
    """Get all reports for the authenticated parent"""
    try:
        parent_auth0_id = session.get('user', {}).get('userinfo', {}).get('sub')
        if not parent_auth0_id:
            return jsonify({'error': 'User not authenticated'}), 401
        
        limit = request.args.get('limit', 50, type=int)
        reports, error = ReportController.get_reports_by_parent(parent_auth0_id, limit)
        
        if error:
            return jsonify({'error': error}), 500
        
        return jsonify(reports), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@report_bp.route('/<report_id>', methods=['DELETE'], strict_slashes=False)
@requires_auth
def delete_report(report_id):
    """Delete a report"""
    try:
        parent_auth0_id = session.get('user', {}).get('userinfo', {}).get('sub')
        if not parent_auth0_id:
            return jsonify({'error': 'User not authenticated'}), 401
        
        result, error = ReportController.delete_report(report_id, parent_auth0_id)
        
        if error:
            if error == "Unauthorized":
                return jsonify({'error': error}), 403
            return jsonify({'error': error}), 400
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
