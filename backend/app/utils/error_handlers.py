from flask import jsonify

def handle_error(error, status_code=500):
    response = {
        'success': False,
        'error': str(error)
    }
    return jsonify(response), status_code 