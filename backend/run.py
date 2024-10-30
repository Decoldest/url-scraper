from app import create_app
from flask import send_from_directory

import os

app = create_app()

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@app.route('/', defaults={"filename":"index.html"})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder,filename)

if __name__ == '__main__':
    app.run(debug=True) 