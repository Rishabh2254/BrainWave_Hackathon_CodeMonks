from models.report import Report
from models.assessment import Assessment
from services.ondemand_service import OnDemandService

class ReportController:
    @staticmethod
    def generate_report(assessment_id, parent_auth0_id):
        """Generate a report for an assessment"""
        try:
            # Check if report already exists
            existing_report = Report.find_by_assessment(assessment_id)
            if existing_report:
                return existing_report, None
            
            # Get assessment data
            assessment = Assessment.find_by_id(assessment_id)
            if not assessment:
                return None, "Assessment not found"
            
            # Verify ownership
            if assessment.get('parent_auth0_id') != parent_auth0_id:
                return None, "Unauthorized"
            
            # Generate report using OnDemand API
            report_data, error = OnDemandService.generate_assessment_report(
                assessment, 
                parent_auth0_id
            )
            
            if error:
                return None, error
            
            # Save report to database
            report = Report.create(assessment_id, parent_auth0_id, report_data)
            return report, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_report_by_assessment(assessment_id, parent_auth0_id):
        """Get report for a specific assessment"""
        try:
            report = Report.find_by_assessment(assessment_id)
            if not report:
                return None, "Report not found"
            
            # Verify ownership
            if report.get('parent_auth0_id') != parent_auth0_id:
                return None, "Unauthorized"
            
            return report, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def get_reports_by_parent(parent_auth0_id, limit=50):
        """Get all reports for a parent"""
        try:
            reports = Report.find_by_parent(parent_auth0_id, limit)
            return reports, None
        except Exception as e:
            return None, str(e)
    
    @staticmethod
    def delete_report(report_id, parent_auth0_id):
        """Delete a report"""
        try:
            # Get report and verify ownership
            report = Report.find_by_id(report_id)
            if not report:
                return None, "Report not found"
            
            if report.get('parent_auth0_id') != parent_auth0_id:
                return None, "Unauthorized"
            
            success = Report.delete(report_id)
            if success:
                return {"message": "Report deleted successfully"}, None
            return None, "Failed to delete report"
        except Exception as e:
            return None, str(e)
