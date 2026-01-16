from flask import Blueprint, redirect, session, jsonify
from authlib.integrations.flask_client import OAuth
from utils.decorators import requires_auth
from config.config import Config
from controllers.auth_controller import AuthController
from controllers.user_controller import UserController

auth_bp = Blueprint('auth', __name__)

# OAuth instance
oauth = None


def init_oauth(app):
    """Initialize OAuth with app context"""
    global oauth
    oauth = OAuth(app)
    oauth.register(
        'auth0',
        client_id=Config.AUTH0_CLIENT_ID,
        client_secret=Config.AUTH0_CLIENT_SECRET,
        client_kwargs={
            'scope': 'openid profile email',
        },
        server_metadata_url=f'https://{Config.AUTH0_DOMAIN}/.well-known/openid-configuration',
    )
    return oauth


@auth_bp.route('/login', methods=['GET'])
def login():
    """Redirect to Auth0 login page"""
    redirect_uri = AuthController.get_redirect_uri()
    return oauth.auth0.authorize_redirect(redirect_uri)


@auth_bp.route('/callback', methods=['GET'])
def callback():
    """Handle Auth0 callback after authentication"""
    try:
        # Get access token from Auth0
        token = oauth.auth0.authorize_access_token()
        user_info = token.get('userinfo')
        
        # Handle authentication through controller
        success, user_data, error = AuthController.handle_auth_callback(token, user_info)
        
        if success:
            # Redirect to frontend with success
            return redirect(AuthController.get_frontend_redirect(success=True))
        else:
            # Redirect to frontend with error
            return redirect(AuthController.get_frontend_redirect(success=False, message=error))
        
    except Exception as e:
        print(f"Callback error: {str(e)}")
        return redirect(AuthController.get_frontend_redirect(success=False, message=str(e)))


@auth_bp.route('/register', methods=['GET'])
def register():
    """Redirect to Auth0 signup page"""
    redirect_uri = AuthController.get_redirect_uri()
    return oauth.auth0.authorize_redirect(
        redirect_uri,
        screen_hint='signup'
    )


@auth_bp.route('/logout', methods=['POST', 'GET'])
def logout():
    """Logout user and clear session"""
    AuthController.clear_session()
    return redirect(AuthController.get_logout_url())


@auth_bp.route('/user', methods=['GET'])
@requires_auth
def get_user():
    """Get current authenticated user info from MongoDB"""
    auth0_id = AuthController.get_session_auth0_id()
    
    if not auth0_id:
        return jsonify(error='No auth0_id in session'), 401
    
    # Get user from database through controller
    user = UserController.get_user_by_auth0_id(auth0_id)
    
    if not user:
        return jsonify(error='User not found'), 404
    
    # Format response through controller
    return jsonify(UserController.format_user_response(user))


@auth_bp.route('/check', methods=['GET'])
def check_auth():
    """Check if user is authenticated"""
    if AuthController.is_authenticated():
        return jsonify(
            authenticated=True,
            user_id=AuthController.get_session_user_id()
        ), 200
    return jsonify(authenticated=False), 200


@auth_bp.route('/me', methods=['GET'])
@requires_auth
def get_current_user():
    """Get current user profile from session"""
    user_info = AuthController.get_session_user_info()
    return jsonify({
        'auth0_id': user_info.get('sub'),
        'email': user_info.get('email'),
        'name': user_info.get('name'),
        'picture': user_info.get('picture'),
        'email_verified': user_info.get('email_verified')
    })
