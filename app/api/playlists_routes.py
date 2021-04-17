from flask import Blueprint, json, request, jsonify, flash
from app.models import Song, db, User, Playlist
# from app.forms import PlaylistForm


playlists_routes = Blueprint('playlists', __name__)



@playlists_routes.route('/', methods=['PUT'])
def userPlaylists():
    userId = request.json
    print('!!!!!/////////!!!!!!', userId)
    playlists = Playlist.query.filter_by(user_id=userId).all()
    playlistList = []
    for playlist in playlists:
        playlist_id = playlist.id
        playlist_dict = playlist.to_dict()
        # playlist_dict['playlist_id'] = playlist_id
        playlistList.append(playlist_dict)
    
    return jsonify(playlistList)


@playlists_routes.route('/', methods=['POST'])
def addPlaylist():
    data = request.json
    # form = PlaylistForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    playlist = Playlist(
        name=data['name'], 
        user_id=data['userId'],
        song_id=None,
        )
    db.session.add(playlist)
    db.session.commit()
    playlists = Playlist.query.filter_by(user_id=data['userId']).all()
    playlistList = []
    for playlist in playlists:
        playlist_id = playlist.id
        playlist_dict = playlist.to_dict()
        # playlist_dict['playlist_id'] = playlist_id
        playlistList.append(playlist_dict)
    
    return jsonify(playlistList)


@playlists_routes.route('/playlist/', methods=['POST'])
def addToPlaylist():
    data = request.json
    playlist = Playlist(
        name=data['name'], 
        song_id=data['songId'],
        user_id=data['userId'],
        )
    db.session.add(playlist)
    db.session.commit()
    playlists = Playlist.query.filter_by(user_id=data['userId']).all()
    playlistList = []
    for playlist in playlists:
        playlist_id = playlist.id
        playlist_dict = playlist.to_dict()
        # playlist_dict['playlist_id'] = playlist_id
        playlistList.append(playlist_dict)
    
    return jsonify(playlistList)


@playlists_routes.route('/playlists/', methods=['DELETE'])
def deleteFromPlaylist():
    data = request.json
    playlistItem = Playlist.query.get(data['playlistItemId'])
    db.session.delete(playlistItem)
    db.session.commit()
    playlists = Playlist.query.filter_by(user_id=data['userId']).all()
    playlistList = []
    for playlist in playlists:
        playlist_id = playlist.id
        playlist_dict = playlist.to_dict()
        # playlist_dict['playlist_id'] = playlist_id
        playlistList.append(playlist_dict)
    
    return jsonify(playlistList)


@playlists_routes.route('/', methods=['DELETE'])
def deletePlaylist():
    data = request.json
    playlist = Playlist.query.filter_by(name=data['name']).all()
    db.session.delete(playlist)
    db.session.commit()
    playlists = Playlist.query.filter_by(user_id=data['userId']).all()
    playlistList = []
    for playlist in playlists:
        playlist_id = playlist.id
        playlist_dict = playlist.to_dict()
        # playlist_dict['playlist_id'] = playlist_id
        playlistList.append(playlist_dict)
    
    return jsonify(playlistList)
