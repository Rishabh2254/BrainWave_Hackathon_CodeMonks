from flask import session, redirect
from models.user import User
from config.config import Config
from urllib.parse import urlencode


class AuthController:
    """Controller for authentication business logic"""
    
    @staticmethod
    def handle_auth_callback(token, user_info):
        """
        Handle Auth0 callback and user creation/update
        
        Args:
            token: OAuth token from Auth0
            user_info: User information from Auth0
            
        Returns:
            tuple: (success: bool, user_data: dict, error: str)
        """
        try:
            if not user_info:
                return False, None, "Failed to get user info from Auth0"
            
            # Extract user details
            auth0_id = user_info.get('sub')
            email = user_info.get('email')
            name = user_info.get('name')
            picture = user_info.get('picture')
            email_verified = user_info.get('email_verified', False)
            
            if not auth0_id or not email:
                return False, None, "Missing required user information"
            
            # Save or update user in MongoDB
            user = User.find_or_create(
                auth0_id=auth0_id,
                email=email,
                name=name,
                picture=picture,
                email_verified=email_verified
            )
            
            # Store in session
            session['user'] = token
            session['user_id'] = user['_id']
            session['auth0_id'] = auth0_id
            session.permanent = True
            
            return True, user, None
            
        except Exception as e:
            return False, None, str(e)
    
    @staticmethod
    def get_redirect_uri():
        """Get the Auth0 callback redirect URI"""
        return f'{Config.BACKEND_URL}/api/auth/callback'
    
    @staticmethod
    def get_logout_url():
        """Generate Auth0 logout URL"""
        params = {
            'returnTo': Config.FRONTEND_URL,
            'client_id': Config.AUTH0_CLIENT_ID
        }
        return f'https://{Config.AUTH0_DOMAIN}/v2/logout?{urlencode(params)}'
    
    @staticmethod
    def get_frontend_redirect(success=True, message=None):
        """Generate frontend redirect URL"""
        if success:
            return f'{Config.FRONTEND_URL}/parent'
        else:
            error_msg = message or 'Authentication failed'
            return f'{Config.FRONTEND_URL}/select-user?login=error&message={error_msg}'
    
    @staticmethod
    def clear_session():
        """Clear user session"""
        session.clear()
    
    @staticmethod
    def is_authenticated():
        """Check if user is authenticated"""
        return 'user' in session and 'auth0_id' in session
    
    @staticmethod
    def get_session_user_id():
        """Get user ID from session"""
        return session.get('user_id')
    
    @staticmethod
    def get_session_auth0_id():
        """Get Auth0 ID from session"""
        return session.get('auth0_id')
    
    @staticmethod
    def get_session_user_info():
        """Get user info from session"""
        return session.get('user', {}).get('userinfo', {})
