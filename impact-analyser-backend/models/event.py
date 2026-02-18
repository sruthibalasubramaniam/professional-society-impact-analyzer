from extensions import db

class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.String(50), nullable=False)
    skill_focus = db.Column(db.String(150), nullable=True)

    society_id = db.Column(
        db.Integer,
        db.ForeignKey("societies.id"),
        nullable=False
    )

    society = db.relationship("Society", backref="events")
