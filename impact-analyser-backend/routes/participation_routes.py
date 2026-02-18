from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.participation import Participation
from models.user import User
from models.event import Event

participation_bp = Blueprint("participation", __name__)


# -----------------------
# REGISTER FOR EVENT (STUDENT ONLY)
# -----------------------
@participation_bp.route("/", methods=["POST"])
@jwt_required()
def register_for_event():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    # Only students can register
    if user.role != "student":
        return jsonify({"message": "Only students can register for events"}), 403

    data = request.get_json()
    event_id = data.get("event_id")

    if not event_id:
        return jsonify({"message": "event_id is required"}), 400

    event = Event.query.get(event_id)
    if not event:
        return jsonify({"message": "Event not found"}), 404

    # Prevent duplicate registration
    existing = Participation.query.filter_by(
        student_id=user.id,
        event_id=event_id
    ).first()

    if existing:
        return jsonify({"message": "Already registered for this event"}), 400

    new_participation = Participation(
        student_id=user.id,
        event_id=event_id,
        attended=False,
        hours=0
    )

    db.session.add(new_participation)
    db.session.commit()

    return jsonify({
        "message": "Registered successfully",
        "event_id": event_id
    }), 201


# -----------------------
# MARK ATTENDANCE (ADMIN)
# -----------------------
@participation_bp.route("/mark-attendance", methods=["POST"])
@jwt_required()
def mark_attendance():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))

    if user.role != "admin":
        return jsonify({"message": "Only admin can mark attendance"}), 403

    data = request.get_json()
    participation_id = data.get("participation_id")
    attended = data.get("attended")
    hours = data.get("hours")

    participation = Participation.query.get(participation_id)

    if not participation:
        return jsonify({"message": "Participation not found"}), 404

    participation.attended = attended
    participation.hours = hours

    db.session.commit()

    return jsonify({
        "message": "Attendance updated successfully"
    }), 200


# -----------------------
# VIEW MY PARTICIPATIONS
# -----------------------
@participation_bp.route("/my-events", methods=["GET"])
@jwt_required()
def my_events():
    current_user_id = get_jwt_identity()

    records = Participation.query.filter_by(
        student_id=int(current_user_id)
    ).all()

    result = []
    for p in records:
        result.append({
            "event_id": p.event_id,
            "attended": p.attended,
            "hours": p.hours
        })

    return jsonify(result), 200
