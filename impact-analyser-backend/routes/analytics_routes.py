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
