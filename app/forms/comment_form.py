from flask_wtf import FlaskForm
from wtforms import Field, StringField, BooleanField, FileField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Song, Comment
import re


class CommentForm(FlaskForm):
    user_id = StringField('user_id', validators=[
        DataRequired()])
    song_id = StringField('song_id', validators=[
        DataRequired()])
    comment = StringField('comment', validators=[
        DataRequired()])
