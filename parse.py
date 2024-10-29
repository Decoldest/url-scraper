import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Gemini
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

template = """
You are tasked with extracting specific information from the following text content. 
Please follow these instructions carefully:

1. Extract Information: Only extract the information that directly matches this description: {parse_instructions}
2. No Extra Content: Do not include any additional text, comments, or explanations in your response
3. Empty Response: If no information matches the description, return an empty string ('')
4. Direct Data Only: Your output should contain only the data that is explicitly requested, with no other text

Content to analyze: {dom_content}
"""

def gemini_parse(dom_content, parse_instructions):
    parsed_results = []

    for i, chunk in enumerate(dom_content, start=1):
        print("chunk: ", chunk)
        prompt = template.format(
            dom_content=chunk,
            parse_instructions=parse_instructions
        )
        
        response = model.generate_content(prompt)
        print(response)
        result = response.text.strip()
        
        if result:
            parsed_results.append(result)
        
    print(parsed_results)


    return "\n".join(parsed_results)