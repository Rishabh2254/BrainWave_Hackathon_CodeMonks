from functools import wraps
from flask import jsonify, session

def requires_auth(f):
    """Decorator to protect routes requiring authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user' not in session:
            return jsonify(error='Authentication required'), 401
        return f(*args, **kwargs)
    return decorated
