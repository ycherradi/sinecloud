from flask_wtf import FlaskForm
from wtforms import Field, StringField, BooleanField, FileField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


class UploadForm(FlaskForm):
    user_id = StringField('id', validators=[
        DataRequired()])
    title = StringField('title', validators=[
        DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    artist = StringField('artist', validators=[
        DataRequired()])
    image_url = StringField('image', validators=[
        DataRequired()])
    genre_id = BooleanField('genre', validators=[
        DataRequired()])
    audio_file = StringField('audio_file', validators=[
        DataRequired()])
