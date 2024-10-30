from flask import Blueprint, request, jsonify, send_from_directory
from app.services.scraper import scrape_website, extract_text, clean_text, split_into_sections
from app.services.analyzer import gemini_parse
import os

api = Blueprint('api', __name__)

@api.route('/api/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({
            'success': False,
            'error': 'URL is required'
        }), 400
    
    try:
        result = scrape_website(url)
        if result:
            body_text = extract_text(result)
            cleaned_text = clean_text(body_text)
            return jsonify({
                'success': True,
                'content': cleaned_text
            })
        return jsonify({
            'success': False,
            'error': 'Failed to scrape website'
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@api.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    content = data.get('content')
    instructions = data.get('instructions')
    
    if not content or not instructions:
        return jsonify({
            'success': False,
            'error': 'Both content and instructions are required'
        }), 400
    
    try:
        dom_chunks = split_into_sections(content)
        result = gemini_parse(dom_chunks, instructions)
        return jsonify({
            'success': True,
            'result': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500 

