from flask import jsonify, request
from services.ondemand_service import generate_ice_breaker_response

def chat():
    """Handle Ice Breaker chat messages"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        
        # Generate friendly, autism-appropriate response
        response = generate_ice_breaker_response(user_message)
        
        return jsonify({
            'response': response,
            'status': 'success'
        }), 200
        
    except Exception as e:
        print(f"Error in ice_breaker chat: {str(e)}")
        return jsonify({
            'error': 'Failed to generate response',
            'details': str(e)
        }), 500
