from flask import Blueprint, jsonify, session, request
from app.models import User, Song, db


users_routes = Blueprint('users', __name__)


@users_routes.route('/')
def find_users():
    songId = request.json
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}
