from flask import Flask
from flask_sqlalchemy import SQLAlchemy

def create_database(host, user, password, db_name):
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{user}:{password}@{host}/{db_name}"
    db = SQLAlchemy(app)

# Example usage
create_database(host="localhost", user="root", password="password", db_name="cipher_tech_challenge_3")