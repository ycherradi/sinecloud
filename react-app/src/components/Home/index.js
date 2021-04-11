import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as musicActions from '../../store/song';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import * as sessionActions from '../../store/session';
import Songs from '../Songs/index';
import './Home.css';
import Footer from '../Footer/index';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import banner from '../../images/banner2.jpeg';
import Player from '../Player/index';


function Home({ loaded}) {

const dispatch = useDispatch();
const genres = useSelector((state) => state?.genre.genres)
const songs = useSelector((state) => state.song);
const user = useSelector((state) => state?.session.user);
const likes = useSelector((state) => state?.likes);
const users = useSelector((state) => state?.users);


useEffect(() => {
  dispatch(musicActions.findExistingSongs())
}, [dispatch])

const [currentSong, setCurrentSong] = useState(null);

const selectedSong = Object.values(songs).find((song) => song?.id === parseInt(currentSong))


  return (
    <div className='home__page'>
      <div className='banner'><img src={banner} /></div>
      <div>
        <Songs loaded={loaded} setCurrentSong={setCurrentSong} genres={genres}/>
      </div>
      <div>
        <div>
          {selectedSong && <Player selectedSong={selectedSong}/>}
                
        </div>
      </div>
    </div>
  )
}




export default Home;