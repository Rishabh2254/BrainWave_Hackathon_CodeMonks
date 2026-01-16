from datetime import datetime
from config.database import db
from bson import ObjectId

class Assessment:
    collection = db.assessments
    
    @staticmethod
    def create(parent_auth0_id, assessment_data):
        """Create a new assessment for a child"""
        data = {
            'parent_auth0_id': parent_auth0_id,
            'child_info': assessment_data.get('childInfo'),
            'test_results': assessment_data.get('testResults'),
            'total_time': assessment_data.get('totalTime'),
            'observations': assessment_data.get('observations'),
            'assessment_date': assessment_data.get('assessmentDate'),
            'assessment_type': assessment_data.get('assessmentType'),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = Assessment.collection.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return data
    
    @staticmethod
    def find_by_parent(parent_auth0_id, limit=100, skip=0):
        """Find all assessments for a parent"""
        assessments = Assessment.collection.find(
            {'parent_auth0_id': parent_auth0_id}
        ).sort('created_at', -1).limit(limit).skip(skip)
        
        result = []
        for assessment in assessments:
            assessment['_id'] = str(assessment['_id'])
            result.append(assessment)
        return result
    
    @staticmethod
    def find_by_id(assessment_id):
        """Find assessment by ID"""
        try:
            assessment = Assessment.collection.find_one({'_id': ObjectId(assessment_id)})
            if assessment:
                assessment['_id'] = str(assessment['_id'])
            return assessment
        except:
            return None
    
    @staticmethod
    def find_by_child(parent_auth0_id, child_name):
        """Find all assessments for a specific child"""
        assessments = Assessment.collection.find({
            'parent_auth0_id': parent_auth0_id,
            'child_info.name': child_name
        }).sort('created_at', -1)
        
        result = []
        for assessment in assessments:
            assessment['_id'] = str(assessment['_id'])
            result.append(assessment)
        return result
    
    @staticmethod
    def update(assessment_id, update_data):
        """Update an assessment"""
        try:
            update_data['updated_at'] = datetime.utcnow()
            result = Assessment.collection.update_one(
                {'_id': ObjectId(assessment_id)},
                {'$set': update_data}
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    def delete(assessment_id):
        """Delete an assessment"""
        try:
            result = Assessment.collection.delete_one({'_id': ObjectId(assessment_id)})
            return result.deleted_count > 0
        except:
            return False
    
    @staticmethod
    def get_all_for_parent(parent_auth0_id):
        """Get all assessments for a parent with child grouping"""
        assessments = Assessment.collection.find(
            {'parent_auth0_id': parent_auth0_id}
        ).sort('created_at', -1)
        
        result = []
        for assessment in assessments:
            assessment['_id'] = str(assessment['_id'])
            result.append(assessment)
        return result
