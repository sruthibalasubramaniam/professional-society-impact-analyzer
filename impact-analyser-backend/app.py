from flask import Flask, app
from flask_cors import CORS
from config import Config
from extensions import db, jwt



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)


    db.init_app(app)
    jwt.init_app(app)
    
    from models.user import User
    from models.society import Society
    from models.event import Event
    from models.participation import Participation



  
    from routes.auth_routes import auth_bp
    from routes.society_routes import society_bp
    from routes.event_routes import event_bp
    from routes.participation_routes import participation_bp
    

    


    
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(society_bp, url_prefix="/api/societies")
    app.register_blueprint(event_bp, url_prefix="/api/events")
    app.register_blueprint(participation_bp, url_prefix="/api/participation")



    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
