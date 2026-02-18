
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.society import Society
from models.user import User

society_bp = Blueprint("society", __name__)

# -----------------------
# CREATE SOCIETY (ADMIN ONLY)
# -----------------------
@society_bp.route("/", methods=["POST"])
@jwt_required()
def create_society():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    # Role check
    if user.role != "admin":
        return jsonify({"message": "Only admin can create societies"}), 403

    data = request.get_json()
    name = data.get("name")
    description = data.get("description")

    if not name:
        return jsonify({"message": "Society name is required"}), 400

    new_society = Society(
        name=name,
        description=description,
        created_by=user.id
    )

    db.session.add(new_society)
    db.session.commit()

    return jsonify({
        "message": "Society created successfully",
        "society": {
            "id": new_society.id,
            "name": new_society.name,
            "description": new_society.description
        }
    }), 201


# -----------------------
# GET ALL SOCIETIES
# -----------------------
@society_bp.route("/", methods=["GET"])
@jwt_required()
def get_societies():
    societies = Society.query.all()

    result = []
    for s in societies:
        result.append({
            "id": s.id,
            "name": s.name,
            "description": s.description
        })

    return jsonify(result), 200
