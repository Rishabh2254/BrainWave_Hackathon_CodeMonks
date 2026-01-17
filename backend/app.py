from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from werkzeug.middleware.proxy_fix import ProxyFix

load_dotenv()

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

from config.config import Config
from routes.auth import auth_bp, init_oauth
from routes.user import user_bp
from routes.assessment import assessment_bp
from routes.speech_practice import speech_practice_bp
from routes.report import report_bp
from routes.daily_schedule import daily_schedule_bp
from routes.ice_breaker import ice_breaker_bp
from utils.decorators import requires_auth


def create_app():
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Trust proxy headers from Cloudflare
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
    
    # Disable automatic trailing slash redirects
    app.url_map.strict_slashes = False
    
    app.secret_key = Config.SECRET_KEY
    app.config['SESSION_COOKIE_NAME'] = 'brainwave_session'
    app.config['SESSION_COOKIE_SECURE'] = True  # Changed to True for HTTPS
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_PATH'] = '/'
    app.config['SESSION_COOKIE_DOMAIN'] = None  # Don't restrict domain
    app.config['PERMANENT_SESSION_LIFETIME'] = Config.PERMANENT_SESSION_LIFETIME
    
    # Fix for session not persisting - save session data
    app.config['SESSION_REFRESH_EACH_REQUEST'] = True
    
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173", "http://localhost:5000", "https://brainwaveapi.teamuxh.site"],
            "supports_credentials": True,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Set-Cookie"],
            "max_age": 3600
        }
    })
    
    init_oauth(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(assessment_bp, url_prefix='/api/assessments')
    app.register_blueprint(speech_practice_bp, url_prefix='/api/speech-practice')
    app.register_blueprint(report_bp, url_prefix='/api/reports')
    app.register_blueprint(daily_schedule_bp, url_prefix='/api/daily-schedule')
    app.register_blueprint(ice_breaker_bp, url_prefix='/api/ondemand')
    
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
