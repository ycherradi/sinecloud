import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import './player.css';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import * as commentActions from '../../store/comments';
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import WaveSurfer from "wavesurfer.js";
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js'
import '../visualizer/visualizer.css';

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 2,
  barRadius: 2,
  responsive: true,
  height: 150,

  
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  pixelRatio: 1,
  plugins: [
        Minimap.create({
            container: '#wave-minimap',
            waveColor: "#eee",
            progressColor: "OrangeRed",
            height: 50,
            hideScrollbar: true,
        })
    ]
  
});



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));


let audio = {};

function Player({selectedSong}) {

  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const genres = useSelector((state) => state?.genre.genres);
  // const comments = useSelector((state) => state.comments);
  const [currentSong, setCurrentSong] = useState('');
  // const [playing, setPlaying] = useState(false)
  const [comment, setComment] = useState("");
  // const [commentsChanged, setCommentsChanged] = useState(false)
  const [deleted, setDeleted] = useState(false);
  const [likesChanged ,setLikesChanged ] = useState(false)

	// const selectedSong = Object.values(songs).find((song) => song?.id === parseInt(id));s
	const selectedGenre = genres?.find((genre) => genre?.id === selectedSong?.genre_id)
  const filteredSongs = Object.values(songs).filter((song) => song?.artist === selectedSong?.artist)
  // const selectedComments = Object.values(comments).filter((comment) => comment.song_id === selectedSong?.id)
  const selectedComments = useSelector((state) => state?.comments && Object.values(state?.comments).filter((comment) => comment?.song_id === selectedSong?.id))
  

  const handleAddLike = (e, songId) => {
    e.stopPropagation()
    dispatch(likeActions.addLike(songId, user.id));
    setLikesChanged(true)
  };

  const handleRemoveLike = (e, songId) => {
    e.stopPropagation()
    dispatch(likeActions.removeLike(songId, user.id));
    setLikesChanged(true)
  };


  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(`${selectedSong?.audio_file}`);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      wavesurfer.current.play();
      setPlay(true);
    
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [`${selectedSong?.audio_file}`]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };
  


  useEffect(() => {
    dispatch(musicActions.findExistingSongs())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(genreActions.findAllGenres())
    dispatch(commentActions.findExistingComments())
  }, [dispatch, deleted])


  
  return (
        <div  className="controls">
          <div id="waveform1" ref={waveformRef} />
          <div className="player_image">
            <img src={`${selectedSong?.image_url}`}></img>
          </div>
          <div className='player_songInfo'>
            <div className='player_artist'>{selectedSong?.artist}</div>
            <div className='player_song'>{selectedSong?.title}</div>
          </div>
          <div className='playBtn'>
            <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
          </div>
          <div id="wave-minimap" />
          <div className='volume'>
            <input
              type="range"
              id="volume"
              name="volume"
              // waveSurfer recognize value of `0` same as `1`
              //  so we need to set some zero-ish value for silence
              min="0.01"
              max="1"
              step=".025"
              onChange={onVolumeChange}
              defaultValue={volume}
            />🔊
          </div>
          {/* <div className='likeBtn'>{likes?.includes(selectedSong?.id) ? <button id={`${selectedSong?.id}`} onClick={(e) => handleRemoveLike(e, selectedSong?.id)}>❤️</button> : <button id={`${selectedSong?.id}`} onClick={(e) => handleAddLike(e, selectedSong?.id)}>🤍</button>}</div> */}
      </div>
  )
}



export default Player;