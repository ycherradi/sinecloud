from werkzeug.security import generate_password_hash
from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():

    rockSong1 = Song(title='The Unforgiven', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/7e49cd8b58054c0fae6d022192432e6e.png', audio_file='https://sinecloud.s3.amazonaws.com/15d33ed292b8450ebbaf0b0631fd1860.mp3', artist='Metallica', genre_id='1', user_id='1')
    rockSong2 = Song(title='The Day that never Comes', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/57c822ecc1584c61bbc717e4c875a312.png', audio_file='https://sinecloud.s3.amazonaws.com/727990392e88404fb7cc1be763e1a1a4.mp3', artist='Metallica', genre_id='1', user_id='1')
    rockSong3 = Song(title='Nothing Else Matters', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/f2a1d9acd0924fd0a1f48225250aa3a3.png', audio_file='https://sinecloud.s3.amazonaws.com/6b48192fecde41acb2d6eab493aae913.mp3', artist='Metallica', genre_id='1', user_id='1')
    rockSong4 = Song(title='Crazy Train', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/6163e0bcbd644151972f6d74c8b280c9.jpg', audio_file='https://sinecloud.s3.amazonaws.com/e5277b8111aa40b989f300045161749c.mp3', artist='Ozzy Osbourne', genre_id='1', user_id='1')
    rockSong5 = Song(title='Ace of Spades', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/d4753c2100d44d01a6a0e4f277ff84e1.jpg', audio_file='https://sinecloud.s3.amazonaws.com/35c6678f813542338da1735a5508b9aa.mp3', artist='Motorhead', genre_id='1', user_id='1')
    rockSong6 = Song(title='Master of Puppets', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/8fa7923e83c84f70a2fcc7fb56698315.png', audio_file='https://sinecloud.s3.amazonaws.com/f67e8b3afe0f4f9189b2f29ca6c8f779.mp3', artist='Metallica', genre_id='1', user_id='1')
    rockSong7 = Song(title='Peace Sells', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/91093b8c98e242fdaea700ca04b08593.jpg', audio_file='https://sinecloud.s3.amazonaws.com/7f7dce08046b4f758fc671eb2e1920ba.mp3', artist='Megadeth', genre_id='1', user_id='1')
    rockSong8 = Song(title='Paranoid', description='Metal', image_url='https://sinecloud.s3.amazonaws.com/f7dbb117f3f647b49900ecb3302928f1.jpg', audio_file='https://sinecloud.s3.amazonaws.com/fee32c5e05a449f2b471dee4486f8f08.mp3', artist='Black Sabbath', genre_id='1', user_id='1')

    popSong1 = Song(title='If I Were A Boy', description='pop', image_url="https://i1.sndcdn.com/artworks-000534241092-qya04p-t500x500.jpg", audio_file='https://pl.meln.top/mr/f63cd504ede7c3d98a85b0a22138f0af.mp3?session_key=051f86d68f3c5ecce122f8a3766d5464', artist='Beyoncé', genre_id='2', user_id='1')
    popSong2 = Song(title='Halo', description='pop', image_url='https://sinecloud.s3.amazonaws.com/d04b23575a554d01a51626ff5b3b5fbf.png', audio_file='https://sinecloud.s3.amazonaws.com/2151ae8cb9a4454581ccf536b3685f3c.mp3', artist='Beyoncé', genre_id='2', user_id='1')
    popSong3 = Song(title='Despacito', description='pop', image_url='http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg', audio_file='http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3', artist='Luis Fonsi', genre_id='2', user_id='1')
    popSong4 = Song(title='Rain On Me', description='pop', image_url='https://sinecloud.s3.amazonaws.com/170307b8bacd4d1cb120e155ececcdee.jpg', audio_file="https://sinecloud.s3.amazonaws.com/a4d3b6df3be646cfaa2a6abb7e676892.mp3", artist='Lady Gaga', genre_id='2', user_id='1')
    popSong5 = Song(title='Hey Ya!', description='pop', image_url='https://sinecloud.s3.amazonaws.com/3a25a41ba4e540c6b307c04a800c2f8d.jpg', audio_file='https://pl.meln.top/mr/c9fb5e20452562ee4c9c448ccc52bf68.mp3?session_key=93d647be3d4cc90c7d3e1c5ff49877dd', artist='Outkast', genre_id='2', user_id='1')
    popSong6 = Song(title='Happy!', description='pop', image_url='https://sinecloud.s3.amazonaws.com/40b13220c46b4c3588a4abba5b028541.jpg', audio_file='https://sinecloud.s3.amazonaws.com/7318f5665cb548f4be2246a902bfdef7.mp3', artist='Pharrell Williams', genre_id='2', user_id='1')
    popSong7 = Song(title='Shape of you', description='pop', image_url='https://sinecloud.s3.amazonaws.com/e106a884a4bd4611ba141cb76846cc9c.png', audio_file='https://sinecloud.s3.amazonaws.com/ea9daaa0d87f438eb2b52a0be063cd33.mp3', artist='Ed Sheeran', genre_id='2', user_id='1')
    popSong8 = Song(title='Rolling in the deep', description='pop', image_url='https://sinecloud.s3.amazonaws.com/2686b6ed7deb4bb8b3e25a679423bad2.png', audio_file='https://sinecloud.s3.amazonaws.com/36c83446b13e4daaac4afecf9b0d92bc.mp3', artist='Adele', genre_id='2', user_id='1')


    db.session.add(rockSong1)
    db.session.add(rockSong2)
    db.session.add(rockSong3)
    db.session.add(rockSong4)
    db.session.add(rockSong5)
    db.session.add(rockSong6)
    db.session.add(rockSong7)
    db.session.add(rockSong8)

    db.session.add(popSong1)
    db.session.add(popSong2)
    db.session.add(popSong3)
    db.session.add(popSong4)
    db.session.add(popSong5)
    db.session.add(popSong6)
    db.session.add(popSong7)
    db.session.add(popSong8)
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_songs():
    db.session.execute('TRUNCATE songs CASCADE;')
    db.session.commit()