from datetime import timedelta

class ApplicationConfig:
    SECRET_KEY = 'secret'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:password@mysql:3306/users'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    JWT_SECRET_KEY = 'replace'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=10)
