from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Genre, db

genre_routes = Blueprint('genres', __name__)


@genre_routes.route('/')
def genres():
    genres = Genre.query.all()
    print('Genre!!!!!!!!!!!!!!!!!!!!!!!!!!', Genre)
    return {"genres": [genre.to_dict() for genre in genres]}
