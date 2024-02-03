from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()
bcrypt = Bcrypt()

def get_id():
    return uuid4().hex

class Users(db.Model):
    id = db.Column(db.String(255), primary_key=True, unique=True, nullable=False, default=get_id)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password