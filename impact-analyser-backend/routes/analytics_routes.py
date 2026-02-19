from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models.participation import Participation
from models.user import User

analytics_bp = Blueprint("analytics", __name__)


# -----------------------
# STUDENT IMPACT SCORES
# -----------------------
@analytics_bp.route("/student-impact", methods=["GET"])
@jwt_required()
def student_impact():

    students = User.query.filter_by(role="student").all()

    result = []

    for student in students:
        participations = Participation.query.filter_by(
            student_id=student.id,
            attended=True
        ).all()

        total_hours = sum(p.hours for p in participations)
        total_events = len(participations)

        impact_score = (total_hours * 2) + (total_events * 5)

        result.append({
            "student_id": student.id,
            "name": student.name,
            "total_hours": total_hours,
            "events_attended": total_events,
            "impact_score": impact_score
        })

    return jsonify(result), 200

# -----------------------
# TOP 3 STUDENTS
# -----------------------
@analytics_bp.route("/top-students", methods=["GET"])
@jwt_required()
def top_students():

    students = User.query.filter_by(role="student").all()

    ranking = []

    for student in students:
        participations = Participation.query.filter_by(
            student_id=student.id,
            attended=True
        ).all()

        total_hours = sum(p.hours for p in participations)
        total_events = len(participations)

        impact_score = (total_hours * 2) + (total_events * 5)

        ranking.append({
            "student_id": student.id,
            "name": student.name,
            "impact_score": impact_score
        })

    ranking.sort(key=lambda x: x["impact_score"], reverse=True)

    return jsonify(ranking[:3]), 200

# -----------------------
# SOCIETY IMPACT
# -----------------------
@analytics_bp.route("/society-impact", methods=["GET"])
@jwt_required()
def society_impact():

    from models.society import Society
    from models.event import Event

    societies = Society.query.all()

    result = []

    for society in societies:
        events = Event.query.filter_by(society_id=society.id).all()

        total_hours = 0
        total_attendees = 0

        for event in events:
            participations = Participation.query.filter_by(
                event_id=event.id,
                attended=True
            ).all()

            total_attendees += len(participations)
            total_hours += sum(p.hours for p in participations)

        impact_score = total_hours + (total_attendees * 3)

        result.append({
            "society_id": society.id,
            "society_name": society.name,
            "total_hours": total_hours,
            "total_attendees": total_attendees,
            "impact_score": impact_score
        })

    result.sort(key=lambda x: x["impact_score"], reverse=True)

    return jsonify(result), 200

