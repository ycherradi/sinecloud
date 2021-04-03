import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import * as likeActions from '../../store/likes';
import AudioPlayer from 'react-h5-audio-player';
import './Likes.css';



function Likes() {

const dispatch = useDispatch();
  const [currentSong, setCurrentSong] = useState('');
  const songs = useSelector((state) => state?.song.songs);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);

  const userSongs = songs?.filter((song) => song.user_id === user?.id)

  const ids = {}
  const likeIds = Object.values(likes).map((el) => ids[el.id] = el.id);

  const handleAddLike = (songId) => {
    dispatch(likeActions.addLike(songId, user.id));
  };

  const handleRemoveLike = (songId) => {
    dispatch(likeActions.removeLike(songId, user.id));
  };

  useEffect(() => {
    dispatch(musicActions.findExistingSongs())
  }, [dispatch])

  useEffect(() => {
        dispatch(likeActions.fetchUserLikes(user?.id));
    }, [dispatch, songs]);


  return (
    <div className='row'>
      <div className='column liked__div--outer'>
        <div className='liked__div--inner'>
          {Object.values(likes).map((song) => {
                      return ( 
                                <div className="item__liked">
                                  <div className="image__container" >
                                      <div className="image1" >
                                        <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                        {user && song.id in ids ? <button id={`${song.id}`} className='liked-1' onClick={() => handleRemoveLike(song.id)}></button> : <button id={`${song.id}`} className='like-1' onClick={() => handleAddLike(song.id)}></button>}
                                      </div>
                                      <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)}  className="image2"></div>
                                  </div>
                                  <div className="title">{song?.title}</div>
                                  <div className="artist">{song?.artist}
                                  
                                  </div>
                                </div>
                              )
                    })}
        </div>
        <div className='user__info--outer'>           
          <div className='user__info'>
            <div className='following'> Following
              <div>0</div>
            </div>
            <div className='followers'> Followers
              <div>0</div>
            </div>
            <div className='tracks'> Tracks
              <div>{userSongs?.length}</div>
          </div>
        </div>
        </div>    
        <AudioPlayer
          className="audio__player"
          autoPlay
          src={`${currentSong}`}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
        
      </div>
    </div>
  )
}





export default Likes;