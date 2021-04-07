
from flask import Blueprint, json, request, jsonify, flash
from app.models import Song, db, User, Comment
from app.forms import CommentForm


comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/', methods=['POST'])

def add_comment():
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    new_comment = Comment(
        user_id=request.form['userId'],
        song_id=request.form['songId'],
        comment=request.form['comment'],
    )

    db.session.add(new_comment)
    db.session.commit()
    data = new_comment.to_dict()
    return data


# Find single server
@comments_routes.route('/')
def find_comments():
    allComments = Comment.query.all()
    print('!!!!!!!!!!!???????????', allComments)
    comments = {}
    for comment in allComments:
        comment_dict = comment.to_dict()
        userid = comment.user_id
        user = User.query.get(userid).to_dict() 
        comment_dict['userProfileURL'] = user['profile_URL']
        comment_dict['username'] = user['artist_name']     
        comments[comment.id] = comment_dict
    return comments


@comments_routes.route('/', methods=['DELETE'])
def delete_comment():
    commentId = request.json
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()


@comments_routes.route('/', methods=['PUT'])
def edit_comment():

    matched_comment = Comment.query.get(request.form['commentId']) 
    matched_song.comment = request.form['comment']
    db.session.commit()
    data = matched_comment.to_dict()
    return data
