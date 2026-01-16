from models.assessment import Assessment
from flask import session

class AssessmentController:
    @staticmethod
    def create_assessment(assessment_data, parent_auth0_id):
        """Create a new assessment"""
        try:
            # Validate required fields
            required_fields = ['childInfo', 'testResults', 'observations', 'assessmentType']
            for field in required_fields:
                if field not in assessment_data:
                    return None, f"Missing required field: {field}"
            
            # Create assessment
            assessment = Assessment.create(parent_auth0_id, assessment_data)
            return assessment, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_assessments_by_parent(parent_auth0_id, limit=100, skip=0):
        """Get all assessments for a parent"""
        try:
            assessments = Assessment.find_by_parent(parent_auth0_id, limit, skip)
            return assessments, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_assessment_by_id(assessment_id, parent_auth0_id):
        """Get a specific assessment (with authorization check)"""
        try:
            assessment = Assessment.find_by_id(assessment_id)
            if not assessment:
                return None, "Assessment not found"
            
            # Check if the assessment belongs to the requesting parent
            if assessment.get('parent_auth0_id') != parent_auth0_id:
                return None, "Unauthorized"
            
            return assessment, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_assessments_by_child(parent_auth0_id, child_name):
        """Get all assessments for a specific child"""
        try:
            assessments = Assessment.find_by_child(parent_auth0_id, child_name)
            return assessments, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def update_assessment(assessment_id, parent_auth0_id, update_data):
        """Update an assessment (with authorization check)"""
        try:
            # Check if assessment exists and belongs to parent
            assessment = Assessment.find_by_id(assessment_id)
            if not assessment:
                return False, "Assessment not found"
            
            if assessment.get('parent_auth0_id') != parent_auth0_id:
                return False, "Unauthorized"
            
            # Update assessment
            success = Assessment.update(assessment_id, update_data)
            return success, None if success else "Update failed"
        except Exception as e:
            return False, str(e)
    
    @staticmethod
    def delete_assessment(assessment_id, parent_auth0_id):
        """Delete an assessment (with authorization check)"""
        try:
            # Check if assessment exists and belongs to parent
            assessment = Assessment.find_by_id(assessment_id)
            if not assessment:
                return False, "Assessment not found"
            
            if assessment.get('parent_auth0_id') != parent_auth0_id:
                return False, "Unauthorized"
            
            # Delete assessment
            success = Assessment.delete(assessment_id)
            return success, None if success else "Delete failed"
        except Exception as e:
            return False, str(e)
    
    @staticmethod
    def format_assessment_response(assessment):
        """Format assessment for API response"""
        return {
            'id': assessment.get('_id'),
            'childInfo': assessment.get('child_info'),
            'testResults': assessment.get('test_results'),
            'totalTime': assessment.get('total_time'),
            'observations': assessment.get('observations'),
            'assessmentDate': assessment.get('assessment_date'),
            'assessmentType': assessment.get('assessment_type'),
            'createdAt': assessment.get('created_at').isoformat() if assessment.get('created_at') else None,
            'updatedAt': assessment.get('updated_at').isoformat() if assessment.get('updated_at') else None
        }
