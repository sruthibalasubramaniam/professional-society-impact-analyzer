from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.event import Event
from models.user import User
from models.society import Society

event_bp = Blueprint("events", __name__)


# -----------------------
# CREATE EVENT (ADMIN ONLY)
# -----------------------
@event_bp.route("/", methods=["POST"])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    # Role check
    if user.role != "admin":
        return jsonify({"message": "Only admin can create events"}), 403

    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    date = data.get("date")
    skill_focus = data.get("skill_focus")
    society_id = data.get("society_id")

    if not title or not date or not society_id:
        return jsonify({"message": "Title, date and society_id are required"}), 400

    society = Society.query.get(society_id)
    if not society:
        return jsonify({"message": "Society not found"}), 404

    new_event = Event(
        title=title,
        description=description,
        date=date,
        skill_focus=skill_focus,
        society_id=society_id
    )

    db.session.add(new_event)
    db.session.commit()

    return jsonify({
        "message": "Event created successfully",
        "event": {
            "id": new_event.id,
            "title": new_event.title,
            "society_id": new_event.society_id
        }
    }), 201


# -----------------------
# GET EVENTS (ALL USERS)
# -----------------------
@event_bp.route("/", methods=["GET"])
@jwt_required()
def get_events():
    events = Event.query.all()

    result = []
    for e in events:
        result.append({
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "date": e.date,
            "skill_focus": e.skill_focus,
            "society_id": e.society_id
        })

    return jsonify(result), 200
