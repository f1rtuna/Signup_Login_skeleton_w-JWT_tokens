import redis
from flask import jsonify
from flask_jwt_extended import create_access_token
from models.users import Users, db, bcrypt

class UserService:

    # static methods used to avoid instantiating the class if used simply for ease
    @staticmethod
    def get_all_users():
        users = Users.query.all()
        user_list = [{"id": user.id, "username": user.username, "password": user.password} for user in users]
        return user_list

    @staticmethod
    def signup(username, password):
        potential_user = Users.query.filter_by(username=username).first()
        if potential_user:
            return jsonify({
                "error": "user already exists"
            }), 400
        else:
            encrypted_password = bcrypt.generate_password_hash(password).decode("utf-8")
            new_user = Users(username=username, password=encrypted_password)
            db.session.add(new_user)
            db.session.commit()
    
            return jsonify({
                "id": new_user.id,
                "username": new_user.username,
            }), 201
        
    @staticmethod
    def login(username, password):
        user = Users.query.filter_by(username=username).first()
        password = str(password)
        if user:
            hashed_password_from_db = user.password

            if bcrypt.check_password_hash(hashed_password_from_db, password):
                access_token = create_access_token(identity=user.id)
                return jsonify({
                    "id": user.id,
                    "username": user.username,
                    "access_token": access_token
                }), 200
            else:
                return jsonify(
                    {"error": "Invalid credentials"
                }), 401
        else:
            return jsonify(
                {"error": "User not found"}
            ), 404