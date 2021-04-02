from os import fsync
import json
from json import JSONEncoder
import pydub
import numpy as np
from flask import Blueprint, json, request, jsonify, flash
from app.models import Song, db, User
from app.forms import UploadForm

from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, allowed_audio_file)

songs_routes = Blueprint('songs', __name__)


# def convertToBinaryData(filename):
#     with open(filename, 'rb') as file:
#         binaryData = file.read()
#         print('!!!!!!!!!!!!!!!', binaryData)
#     return binaryData

# class NumpyArrayEncoder(JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, np.ndarray):
#             return obj.tolist()
#         return JSONEncoder.default(self, obj)


# def read(f, normalized=False):
#         """WAV to numpy array"""
#         a = pydub.AudioSegment.from_wav(f)
#         y = np.array(a.get_array_of_samples())
#         if a.channels == 2:
#             y = y.reshape((-1, 2))
#         if normalized:
#             return a.frame_rate, np.float32(y) / 2**15
#         else:
#             return a.frame_rate, y


@songs_routes.route('/', methods=['POST'])
# @login_required
def add_song():
    url_image = None
    url_song = None
    print('//////////////////////////////////////')
    print(request.files)
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url_image = upload["url"]
    if "audio" in request.files:
        song_file = request.files["audio"]
        # content = request.files["audio"].read()
        song_file.filename = get_unique_filename(song_file.filename)
        upload = upload_file_to_s3(song_file)
        url_song = upload["url"]
        print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        print(url_song)
        # Convert song file to binary
        # audio_binary = convertToBinaryData(content)
        # print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        # print(audio_binary)
        # Convert audio file into Numpy array
        # AudioNumpyArray = read(song_file, normalized=False)
        # numpyData = {"array": AudioNumpyArray}

        # # Serialization
        # numpyData = {"array": AudioNumpyArray}
        # # use dump() to write array into file
        # encodedNumpyData = json.dumps(numpyData, cls=NumpyArrayEncoder)
    form = UploadForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('--------------------------------------')
    print(request.form['id'])
    print(request.form['title'])
    print(request.form['description'])
    print(url_image)
    print(url_song)
    print(request.form['genre'])
    print(request.form['artist'])
    new_song = Song(
        user_id=request.form['id'],
        title=request.form['title'],
        description=request.form['description'],
        image_url=url_image,
        audio_file=url_song,
        artist=request.form['artist'],
        genre_id=1,
    )

    db.session.add(new_song)
    db.session.commit()
    data = new_song.to_dict()
    print('data!!!!!!!!!!!!!!!', data)
    return data


# Find single server
@songs_routes.route('/')
def find_songs():
    songId = request.json
    songs = Song.query.all()
    return {"songs": [song.to_dict() for song in songs]}


@songs_routes.route('/', methods=['DELETE'])
def delete_song():
    songId = request.json
    song = Song.query.get(songId)
    db.session.delete(song)
    db.session.commit()


@songs_routes.route('/edit/', methods=['PUT'])
def edit_song():

    matched_song = Song.query.get(request.form['SongId'])
    url_image = None
    url_song = None
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url_image = upload["url"]
    if "audio" in request.files:
        song_file = request.files["audio"]
        song_file.filename = get_unique_filename(song_file.filename)
        upload = upload_file_to_s3(song_file)
        url_song = upload["url"]   

    matched_song.title = request.form['title']
    matched_song.description = request.form['description']
    matched_song.genre = request.form['genre']
    matched_song.image_url = url_image
    matched_song.artist = request.form['artist']
    matched_song.audio_file = url_song
    db.session.commit()
    
    data = matched_song.to_dict()
    return data
