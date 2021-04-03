import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import AudioPlayer from 'react-h5-audio-player';
import './Uploaded.css';



function Upload() {

  const dispatch = useDispatch();
  const [currentSong, setCurrentSong] = useState('');
  const songs = useSelector((state) => state?.song.songs);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const userSongs = songs?.filter((song) => song.user_id === user.id)
  
  useEffect(() => {
    dispatch(musicActions.findExistingSongs())
  }, [dispatch])


  return (
    <div className='uploaded__div--outer'>
      <div className='uploaded__div--inner'>
        {userSongs?.map((song) => {
                    return ( 
                              <div className="item__uploaded">
                                <div className="image__container" >
                                    <div className="image1" >
                                      <img key={`${song.id}`} src={`${song?.image_url}`} alt='song_image' />
                                    </div>
                                    <div id={`${song?.audio_file}`} onClick={(e) => setCurrentSong(e.target.id)}  className="image2"></div>
                                </div>
                                <div className="title">{song?.title}</div>
                                <div className="artist">{song?.artist}</div>
                              </div>
                            )
                  })}
      </div>            
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
      <AudioPlayer
        className="audio__player"
        autoPlay
        src={`${currentSong}`}
        onPlay={e => console.log("onPlay")}
        // other props here
      />
      
    </div>
  )
}





export default Upload;