from werkzeug.security import generate_password_hash
from app.models import db, Genre


# Adds a demo user, you can add other users here if you want
def seed_genres():

    Rock = Genre(name='Rock')
    Pop = Genre(name='Pop')
    Hip = Genre(name='Hip hop')
    Jazz = Genre(name='Jazz')
    Country = Genre(name='Country')
    Metal = Genre(name='Metal')
    World = Genre(name='World music')
    Reggae = Genre(name='Reggae')
    Punk = Genre(name='Punk')

    db.session.add(Rock)
    db.session.add(Pop)
    db.session.add(Hip)
    db.session.add(Jazz)
    db.session.add(Country)
    db.session.add(Metal)
    db.session.add(World)
    db.session.add(Reggae)
    db.session.add(Punk)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_genres():
    db.session.execute('TRUNCATE genres CASCADE;')
    db.session.commit()
