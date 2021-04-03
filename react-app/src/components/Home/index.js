import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import * as musicActions from '../../store/song';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import Songs from '../Songs/index';
import './Home.css';
import Footer from '../Footer/index';




function Home() {

const dispatch = useDispatch();
const genres = useSelector((state) => state?.genre.genres)


const songs = useSelector((state) => state?.song.songs);
const user = useSelector((state) => state?.session.user);
const likes = useSelector((state) => state?.likes);
const [currentSong, setCurrentSong] = useState('');

useEffect(() => {
  dispatch(musicActions.findExistingSongs())

}, [dispatch])

// useEffect(() => {
//   dispatch(genreActions.findAllGenres())
// }, [dispatch])

useEffect(() => {
        dispatch(likeActions.fetchUserLikes(user?.id));
    }, [dispatch, songs]);


  return (
    <>
      <div>
        <Songs setCurrentSong={setCurrentSong} genres={genres}/>
      </div>
      <div>
        <div>
        <AudioPlayer
          className="audio__player"
          autoPlay
          src={`${currentSong}`}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
        </div>
      </div>
    </>
  )
}




export default Home;