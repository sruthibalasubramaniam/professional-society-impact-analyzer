from extensions import db

class Participation(db.Model):
    __tablename__ = "participations"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    event_id = db.Column(
        db.Integer,
        db.ForeignKey("events.id"),
        nullable=False
    )

    attended = db.Column(db.Boolean, default=False)
    hours = db.Column(db.Integer, default=0)

    student = db.relationship("User", backref="participations")
    event = db.relationship("Event", backref="participations")
