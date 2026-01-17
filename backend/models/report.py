from datetime import datetime
from config.database import db
from bson import ObjectId

class Report:
    collection = db.reports
    
    @staticmethod
    def create(assessment_id, parent_auth0_id, report_data):
        """Create a new report"""
        data = {
            'assessment_id': assessment_id,
            'parent_auth0_id': parent_auth0_id,
            'report_content': report_data.get('report'),
            'session_id': report_data.get('session_id'),
            'message_id': report_data.get('message_id'),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = Report.collection.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return data
    
    @staticmethod
    def find_by_assessment(assessment_id):
        """Find report by assessment ID"""
        report = Report.collection.find_one({'assessment_id': assessment_id})
        if report:
            report['_id'] = str(report['_id'])
        return report
    
    @staticmethod
    def find_by_parent(parent_auth0_id, limit=50):
        """Find all reports for a parent"""
        reports = Report.collection.find(
            {'parent_auth0_id': parent_auth0_id}
        ).sort('created_at', -1).limit(limit)
        
        result = []
        for report in reports:
            report['_id'] = str(report['_id'])
            result.append(report)
        return result
    
    @staticmethod
    def find_by_id(report_id):
        """Find report by ID"""
        try:
            report = Report.collection.find_one({'_id': ObjectId(report_id)})
            if report:
                report['_id'] = str(report['_id'])
            return report
        except:
            return None
    
    @staticmethod
    def delete(report_id):
        """Delete a report"""
        try:
            result = Report.collection.delete_one({'_id': ObjectId(report_id)})
            return result.deleted_count > 0
        except:
            return False
