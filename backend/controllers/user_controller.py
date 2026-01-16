from models.user import User
from datetime import datetime


class UserController:
    """Controller for user-related business logic"""
    
    @staticmethod
    def get_user_by_auth0_id(auth0_id):
        """
        Get user by Auth0 ID
        
        Args:
            auth0_id: Auth0 user identifier
            
        Returns:
            dict: User data or None
        """
        return User.find_by_auth0_id(auth0_id)
    
    @staticmethod
    def get_user_by_email(email):
        """
        Get user by email
        
        Args:
            email: User email address
            
        Returns:
            dict: User data or None
        """
        return User.find_by_email(email)
    
    @staticmethod
    def create_user(auth0_id, email, name=None, picture=None):
        """
        Create a new user
        
        Args:
            auth0_id: Auth0 user identifier
            email: User email
            name: User full name
            picture: User profile picture URL
            
        Returns:
            dict: Created user data
        """
        return User.create(auth0_id, email, name, picture)
    
    @staticmethod
    def update_user(auth0_id, update_data):
        """
        Update user information
        
        Args:
            auth0_id: Auth0 user identifier
            update_data: Dictionary of fields to update
            
        Returns:
            bool: True if updated successfully
        """
        return User.update(auth0_id, update_data)
    
    @staticmethod
    def delete_user(auth0_id):
        """
        Delete a user
        
        Args:
            auth0_id: Auth0 user identifier
            
        Returns:
            bool: True if deleted successfully
        """
        return User.delete(auth0_id)
    
    @staticmethod
    def get_all_users(limit=100, skip=0):
        """
        Get all users with pagination
        
        Args:
            limit: Maximum number of users to return
            skip: Number of users to skip
            
        Returns:
            list: List of user dictionaries
        """
        return User.get_all(limit, skip)
    
    @staticmethod
    def format_user_response(user):
        """
        Format user data for API response
        
        Args:
            user: User dictionary from database
            
        Returns:
            dict: Formatted user data
        """
        if not user:
            return None
        
        return {
            'id': user.get('_id'),
            'auth0_id': user.get('auth0_id'),
            'email': user.get('email'),
            'name': user.get('name'),
            'picture': user.get('picture'),
            'email_verified': user.get('email_verified', False),
            'created_at': user.get('created_at').isoformat() if user.get('created_at') else None,
            'updated_at': user.get('updated_at').isoformat() if user.get('updated_at') else None
        }
    
    @staticmethod
    def validate_user_data(email, auth0_id):
        """
        Validate user data
        
        Args:
            email: User email
            auth0_id: Auth0 user identifier
            
        Returns:
            tuple: (is_valid: bool, error_message: str)
        """
        if not email or '@' not in email:
            return False, "Invalid email address"
        
        if not auth0_id:
            return False, "Auth0 ID is required"
        
        return True, None
