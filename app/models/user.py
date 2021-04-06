from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON


likes = db.Table(
    'likes',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    ),
    db.Column(
        'song_id', db.Integer, db.ForeignKey('songs.id'),
        nullable=False
    )
)


follows = db.Table(
    'follows',
    db.Column(
        "following_userId", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    ),
    db.Column(
        'followers_userId', db.Integer, db.ForeignKey('users.id'),
        nullable=False
    )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    artist_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_URL = db.Column(db.String(255))
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )


# --------------------------------------------------------------------
    song_user = db.relationship('Song', back_populates='user_song')
    comments = db.relationship('Comment', back_populates='users')
    playlists = db.relationship('Playlist', back_populates='users')
    songs = db.relationship(
        'Song', secondary=likes, back_populates='users', lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "artist_name": self.artist_name,
            "email": self.email,
            "profile_URL": self.profile_URL
        }


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    audio_file = db.Column(db.String(255))
    artist = db.Column(db.String(255), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(
        'genres.id'), nullable=False, )
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, )
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    user_song = db.relationship('User', back_populates='song_user')
    genre = db.relationship('Genre', back_populates='songs')
    comments = db.relationship('Comment', back_populates='songs')
    playlists = db.relationship('Playlist', back_populates='songs')
    users = db.relationship(
        'User', secondary=likes, back_populates='songs',
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "audio_file": self.audio_file,
            "artist": self.artist,
            "genre_id": self.genre_id,
            "user_id": self.user_id,
        }


class Genre(db.Model):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    songs = db.relationship('Song', back_populates='genre')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=True,)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, )
    song_id = db.Column(db.Integer, db.ForeignKey(
        'songs.id'), nullable=False, )
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    songs = db.relationship('Song', back_populates='comments')
    users = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            "comment": self.comment,
            "user_id": self.user_id,
            "song_id": self.song_id,
        }


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=True,)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, )
    song_id = db.Column(db.Integer, db.ForeignKey(
        'songs.id'), nullable=False, )
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow
    )
    songs = db.relationship('Song', back_populates='playlists')
    users = db.relationship('User', back_populates='playlists')

    def to_dict(self):
        return {
            "name": self.name,
            "user_id": self.user_id,
            "song_id": self.song_id,
        }

