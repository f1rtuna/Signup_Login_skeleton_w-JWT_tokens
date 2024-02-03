import redis
import json
from flask import Flask, jsonify, request
from datetime import timedelta
from flask_jwt_extended import get_jwt, jwt_required, unset_jwt_cookies, JWTManager
from config import ApplicationConfig
from flask_cors import CORS
from models.users import db
from services.user_service import UserService

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config.from_object(ApplicationConfig)

# Initialize the db instance with the Flask app
db.init_app(app)

#switching to states JWT and utilizing redis to store a blocklist of revoked tokens
jwt = JWTManager(app)
jwt_redis_blocklist = redis.StrictRedis(host="redis", port=6379, db=0, decode_responses=True)

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token_in_redis = jwt_redis_blocklist.get(jti)
    return token_in_redis is not None
    
@app.route("/users")
@jwt_required()
def get_users():
    return jsonify(UserService.get_all_users())

@app.route("/congrats")
@jwt_required()
def get_success_message():
    return jsonify({
        "message": "Congrats! You are authorized to view this SECURE PAGE."
    }), 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    result, status_code = UserService.signup(username, password)
    return result, status_code

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    result, status_code = UserService.login(username, password)
    return result, status_code

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_redis_blocklist.set(jti, "", ex=timedelta(minutes=5))
    response = jsonify({"message": "access token revoked"})
    unset_jwt_cookies(response)
    return response, 200
    
if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')