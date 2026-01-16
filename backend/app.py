from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

from config.config import Config
from routes.auth import auth_bp, init_oauth
from routes.user import user_bp
from utils.decorators import requires_auth


def create_app():
    """Application factory pattern"""
    app = Flask(__name__)
    
    app.secret_key = Config.SECRET_KEY
    app.config['SESSION_COOKIE_SECURE'] = Config.SESSION_COOKIE_SECURE
    app.config['SESSION_COOKIE_HTTPONLY'] = Config.SESSION_COOKIE_HTTPONLY
    app.config['SESSION_COOKIE_SAMESITE'] = Config.SESSION_COOKIE_SAMESITE
    app.config['PERMANENT_SESSION_LIFETIME'] = Config.PERMANENT_SESSION_LIFETIME
    
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173", "http://localhost:5000"],
            "supports_credentials": True
        }
    })
    
    init_oauth(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify(status='OK', message='Server is running'), 200
    
    @app.route('/api/protected', methods=['GET'])
    @requires_auth
    def protected():
        """Example protected route"""
        from flask import session
        return jsonify(
            message='This is a protected route',
            user=session.get('user', {}).get('userinfo', {})
        )
    
    @app.route('/', methods=['GET'])
    def root():
        return jsonify(
            message='BrainWave API',
            version='1.0.0',
            architecture='MVC Pattern',
            endpoints={
                'health': '/health',
                'auth_login': '/api/auth/login',
                'auth_register': '/api/auth/register',
                'auth_logout': '/api/auth/logout',
                'auth_user': '/api/auth/user',
                'auth_check': '/api/auth/check',
                'auth_me': '/api/auth/me',
                'users_list': '/api/users/',
                'users_profile': '/api/users/profile',
                'user_by_id': '/api/users/<auth0_id>'
            }
        )
    
    return app


if __name__ == '__main__':
    app = create_app()
    print("Starting BrainWave Backend Server...")
    print(f"Server running at: http://localhost:5000")
    print(f"Architecture: MVC Pattern")
    print(f"Auth0 Domain: {Config.AUTH0_DOMAIN}")
    print(f"Frontend URL: {Config.FRONTEND_URL}")
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
