from flask import Blueprint
from controllers.ice_breaker_controller import chat

ice_breaker_bp = Blueprint('ice_breaker', __name__)

# Chat endpoint
ice_breaker_bp.route('/chat', methods=['POST'])(chat)
