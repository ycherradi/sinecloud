import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import * as musicActions from '../../store/song';
import * as genreActions from '../../store/genre';
import Songs from '../Songs/index';




function Home() {

const dispatch = useDispatch();
const genres = useSelector((state) => state?.genre.genres)

useEffect(() => {
  dispatch(musicActions.findExistingSongs())
  dispatch(genreActions.findAllGenres())
}, [dispatch])

const songs = useSelector((state) => state?.song.songs)
const [currentSong, setCurrentSong] = useState('');

console.log(songs)
console.log(currentSong)

  return (
    <>
      <div>
        <Songs setCurrentSong={setCurrentSong} genres={genres}/>
      </div>
      <AudioPlayer
        className="audio__player"
        autoPlay
        src={`${currentSong}`}
        onPlay={e => console.log("onPlay")}
        // other props here
      />
    </>
  )
}




export default Home;