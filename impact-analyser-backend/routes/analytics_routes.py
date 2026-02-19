from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models.participation import Participation
from models.user import User
from utils.role_required import role_required


analytics_bp = Blueprint("analytics", __name__)


# -----------------------
# STUDENT IMPACT SCORES
# -----------------------
from flask import request
from sqlalchemy import func

@analytics_bp.route("/student-impact-paginated", methods=["GET"])
@jwt_required()
@role_required("admin")
def student_impact_paginated():

    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 5))

    data = db.session.query(
        User.id,
        User.name,
        func.count(Participation.id).label("events_attended"),
        func.sum(Participation.hours).label("total_hours")
    ).join(
        Participation,
        User.id == Participation.student_id
    ).filter(
        Participation.attended == True,
        User.role == "student"
    ).group_by(User.id).paginate(page=page, per_page=per_page, error_out=False)

    result = []

    for student_id, name, events_attended, total_hours in data.items:
        impact_score = (total_hours * 2) + (events_attended * 5)

        result.append({
            "student_id": student_id,
            "name": name,
            "events_attended": events_attended,
            "total_hours": total_hours,
            "impact_score": impact_score
        })

    return jsonify({
        "page": page,
        "per_page": per_page,
        "total_records": data.total,
        "total_pages": data.pages,
        "students": result
    }), 200

# -----------------------
# TOP 3 STUDENTS
# -----------------------
@analytics_bp.route("/top-students", methods=["GET"])
@jwt_required()
@role_required("admin")

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
@role_required("admin")

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

# -----------------------
# DASHBOARD SUMMARY
# -----------------------
@analytics_bp.route("/dashboard-summary", methods=["GET"])
@jwt_required()
@role_required("admin")

def dashboard_summary():

    from models.society import Society
    from models.event import Event

    total_students = User.query.filter_by(role="student").count()
    total_societies = Society.query.count()
    total_events = Event.query.count()
    total_participations = Participation.query.filter_by(attended=True).count()

    # Get top student
    students = User.query.filter_by(role="student").all()

    top_student = None
    max_score = 0

    for student in students:
        participations = Participation.query.filter_by(
            student_id=student.id,
            attended=True
        ).all()

        total_hours = sum(p.hours for p in participations)
        total_events_attended = len(participations)

        score = (total_hours * 2) + (total_events_attended * 5)

        if score > max_score:
            max_score = score
            top_student = student.name

    return jsonify({
        "total_students": total_students,
        "total_societies": total_societies,
        "total_events": total_events,
        "total_attended_participations": total_participations,
        "top_student": top_student,
        "top_student_score": max_score
    }), 200

