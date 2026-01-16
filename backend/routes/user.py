from flask import Blueprint, jsonify, request
from utils.decorators import requires_auth
from controllers.user_controller import UserController
from controllers.auth_controller import AuthController

user_bp = Blueprint('user', __name__)


@user_bp.route('/', methods=['GET'])
@requires_auth
def get_users():
    """Get all users with pagination"""
    limit = request.args.get('limit', 100, type=int)
    skip = request.args.get('skip', 0, type=int)
    
    users = UserController.get_all_users(limit=limit, skip=skip)
    formatted_users = [UserController.format_user_response(user) for user in users]
    
    return jsonify({
        'users': formatted_users,
        'count': len(formatted_users),
        'limit': limit,
        'skip': skip
    })


@user_bp.route('/<auth0_id>', methods=['GET'])
@requires_auth
def get_user_by_id(auth0_id):
    """Get user by Auth0 ID"""
    user = UserController.get_user_by_auth0_id(auth0_id)
    
    if not user:
        return jsonify(error='User not found'), 404
    
    return jsonify(UserController.format_user_response(user))


@user_bp.route('/<auth0_id>', methods=['PUT'])
@requires_auth
def update_user(auth0_id):
    """Update user information"""
    # Only allow users to update their own profile
    current_auth0_id = AuthController.get_session_auth0_id()
    
    if current_auth0_id != auth0_id:
        return jsonify(error='Unauthorized to update this user'), 403
    
    data = request.get_json()
    
    # Only allow updating specific fields
    allowed_fields = ['name', 'picture']
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    
    if not update_data:
        return jsonify(error='No valid fields to update'), 400
    
    success = UserController.update_user(auth0_id, update_data)
    
    if success:
        user = UserController.get_user_by_auth0_id(auth0_id)
        return jsonify({
            'message': 'User updated successfully',
            'user': UserController.format_user_response(user)
        })
    else:
        return jsonify(error='Failed to update user'), 500


@user_bp.route('/<auth0_id>', methods=['DELETE'])
@requires_auth
def delete_user(auth0_id):
    """Delete user account"""
    # Only allow users to delete their own account
    current_auth0_id = AuthController.get_session_auth0_id()
    
    if current_auth0_id != auth0_id:
        return jsonify(error='Unauthorized to delete this user'), 403
    
    success = UserController.delete_user(auth0_id)
    
    if success:
        # Clear session after deleting account
        AuthController.clear_session()
        return jsonify(message='User deleted successfully')
    else:
        return jsonify(error='Failed to delete user'), 500


@user_bp.route('/profile', methods=['GET'])
@requires_auth
def get_current_user_profile():
    """Get current user's full profile"""
    auth0_id = AuthController.get_session_auth0_id()
    
    if not auth0_id:
        return jsonify(error='No auth0_id in session'), 401
    
    user = UserController.get_user_by_auth0_id(auth0_id)
    
    if not user:
        return jsonify(error='User not found'), 404
    
    return jsonify(UserController.format_user_response(user))
