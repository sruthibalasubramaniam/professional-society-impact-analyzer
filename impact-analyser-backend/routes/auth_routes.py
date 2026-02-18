from flask import Blueprint, request, jsonify
from extensions import db
from models.user import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

# -----------------------
# REGISTER ROUTE
# -----------------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not name or not email or not password or not role:
        return jsonify({"message": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 400

    new_user = User(
        name=name,
        email=email,
        role=role
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# -----------------------
# LOGIN ROUTE
# -----------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))


    return jsonify({
        "access_token": access_token,
        "role": user.role
    }), 200

from flask_jwt_extended import jwt_required, get_jwt_identity

# -----------------------
# PROTECTED TEST ROUTE
# -----------------------
from models.user import User
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    

    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    return jsonify({
        "message": "Protected route accessed",
        "user": {
            "id": user.id,
            "name": user.name,
            "role": user.role
        }
    })



