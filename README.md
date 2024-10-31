# Url Scraper

## Description
A web scraper that uses ai to analyze the resulting data.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Python 3.9 or higher
- pip (Python package installer)
- Google Gemini API Key

## Cloning the Repository
To clone this repository, follow these steps:

1. Open your terminal (Command Prompt, PowerShell, or any terminal emulator).
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:

git clone https://github.com/decoldest/url-scraper.git

## Installing Dependencies
After cloning the repository, navigate into the project directory:
cd your-repository-name

### Creating a dotenv file
Create a .env file:
touch .env
Add your Gemini API key to .env:
GEMINI_API_KEY=yourgeminiapikey

### Creating a Virtual Environment
To create a new virtual environment, follow these steps:

1. In your project directory, run the following command:
   python -m venv venv OR python3 -m venv venv

3. Activate the virtual environment:
   - **For Unix or MacOS:**
   ```
   source venv/bin/activate
   ```

   - **For Windows:**
   ```
   venv\Scripts\activate
   ```

Then, install the required dependencies using pip:
pip install -r requirements.txt

## Running the Project
To run the project, use the following command:
python src/backend/main.py OR python3 src/backend/main.py

## Running the Project
Access the development server in your browser
http://127.0.0.1:5000

## How To Use
1. Enter a URL in the form https://example.com
2. Click Scrape Button and wait for scraping process
3. Enter a prompt in the input box or select the default option
4. Click Analyze

## Limitations
This scraper does not bypass captchas or other human verifications.

## Contributing
If you want to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
