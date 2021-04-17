from flask_wtf import FlaskForm
from wtforms import Field, StringField, BooleanField, FileField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


class PlaylistForm(FlaskForm):
    user_id = StringField('userId', validators=[
        DataRequired()])
    name = StringField('name', validators=[
        DataRequired()])
    

