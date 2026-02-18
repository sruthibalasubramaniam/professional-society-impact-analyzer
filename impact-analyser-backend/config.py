class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres@[::1]:5433/impact_analyzer"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "super-secret-key"
