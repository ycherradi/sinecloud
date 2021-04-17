import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import * as commentActions from '../../store/comments';
import * as followActions from '../../store/follows';
import * as sessionActions from '../../store/session';
import * as playlistActions from '../../store/playlist';
import { useHistory } from "react-router";
import 'react-jinke-music-player/assets/index.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import WaveSurfer from "wavesurfer.js";
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js'
import '../visualizer/visualizer.css';
import './Playlist.css'

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
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
      maxCanvasWidth: 100,
      responsive: true,
      pixelRatio: 1,
      barWidth: 1,
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


const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 5,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#2c2f33',
    border: 'none',
  },
};

let audio = {};

function Playlist({playlist}) {

  const classes = useStyles();

  // let { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const genres = useSelector((state) => state?.genre.genres);
  const followings = useSelector((state) => state?.follows.followers);
  const playlists = useSelector((state) => state?.playlists)

  const filteredPlaylists = playlists?.filter((el) => el?.name === playlist?.name && el?.song_id !== null)
  const playlistSongs = filteredPlaylists?.map((filteredPlaylist) => {
                        return Object.values(songs).filter((song) => filteredPlaylist.song_id === song.id)})
  
  console.log(playlistSongs)


  const [currentSong, setCurrentSong] = useState(playlistSongs[0][0]);

  const [comment, setComment] = useState("");
  
  const [deleted, setDeleted] = useState(false);
  const [followsChanged, setFollowsChanged] = useState(false);
  const [likesChanged, setLikesChanged] = useState(false);
  const [modalIsOpenPlaylist, setIsOpenPlaylist] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const selectedComments = useSelector((state) => state?.comments && Object.values(state?.comments).filter((comment) => comment?.song_id === currentSong?.id))



  const handleClick = (event, songId) => {
    event.stopPropagation()

    dispatch(playlistActions.removefromPlaylist(playlist.name, songId, user.id))
  };

  const handleClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null);
  };
  
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    let duration;
    let currentTime;
    const options = formWaveSurferOptions(waveformRef.current);

    wavesurfer.current = WaveSurfer.create(options);

    
    
    
    wavesurfer.current.load(`${currentSong?.audio_file}`);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      
      wavesurfer.current.play();
      setPlay(true);
      
      duration = wavesurfer.current.getDuration(`${currentSong?.audio_file}`)
      console.log(duration)
      
      
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on("interaction", function () {
      // https://wavesurfer-js.org/docs/methods.html
      
      currentTime = wavesurfer.current.getCurrentTime(`${currentSong?.audio_file}`)
      console.log(currentTime)
      
    });
    

    wavesurfer.current.on("finish", function () {
      // https://wavesurfer-js.org/docs/methods.html
      
      // for(let i = 0; i < playlistSongs.length; i++){
      //   setTimeout(() => {
      //     setCurrentSong(playlistSongs[i][0])
      //   }, 10000)
      // }
      
    });
    
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [`${currentSong?.audio_file}`]);

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



  const updateComment = (e) => {
    setComment(e.target.value);
  };


  const onDelete = (e, commentId) => {
    console.log(commentId)
    e.preventDefault()
    dispatch(commentActions.deleteExistingComment(commentId))
    // setCommentsChanged(true) 
    setTimeout(() => {
      setDeleted(true)
    }, 100);
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', user.id)
    formData.append("songId", currentSong.id);
    formData.append("comment", comment);

    await dispatch(commentActions.addNewComment(formData));
    setComment('');

  }

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

  const onFollow = (e, artistId) => {
    e.stopPropagation()
    dispatch(followActions.addFollow(user.id, artistId));
    setTimeout(() => {
      setFollowsChanged(true);

    }, 100)

  }



  useEffect(() => {
    dispatch(followActions.fetchUserFollows(user?.id))
    dispatch(playlistActions.fetchUserPlaylists(user?.id))
    setFollowsChanged(false)
  }, [dispatch, user, followsChanged])


  useEffect(() => {
    dispatch(musicActions.findExistingSongs())
  }, [dispatch])


  useEffect(() => {
    dispatch(genreActions.findAllGenres())
    dispatch(commentActions.findExistingComments())
  }, [dispatch, deleted])




  return (
    <div className='playlist-song__page'>
      <div id="waveform1" ref={waveformRef} />
      <div className='playlist-songs__areas'>
        {playlistSongs?.map((song) => {
          return (<div className='playlist-song__list' >
            <div className='playlist-oneSong__outer' onClick={() => {
              setCurrentSong(song[0]);
              // handlePlayPause();
            }}>
              <div className='playlist-oneSong__inner' >
                <div className='playlist-song__logo--container'>
                  <div className='playlist-song__logo1'>
                    <img src={`${song[0]?.image_url}`} />
                  </div>
                  <div id={`${song[0]?.audio_file}`} onClick={handlePlayPause} className="playlist-song__logo2"></div>
                </div>
                <div className='artist__name' onClick={() => setCurrentSong(song[0])}>{` ${song[0].artist} `}</div>
                <div className='song_name' onClick={() => setCurrentSong(song[0])}>-- {` ${song[0].title} `}</div>
                <div className='song_spacer'></div>
              </div>
              <div className='additional__controls'>
                {likes?.includes(song[0].id) ? <button id={`${song[0].id}`} onClick={(e) => handleRemoveLike(e, song[0]?.id)}>❤️</button> : <button id={`${song[0].id}`} onClick={(e) => handleAddLike(e, song[0]?.id)}>🤍</button>}
                <button>🔁</button>
                <button onClick={(event) => handleClick(event, song[0]?.id)}>Remove</button>
              </div>
            </div>
          </div>)
        })}
      </div>

      {/* {selectedSong && <ReactJkMusicPlayer 
              id='audio-element'
              {...params}
                  
        />} */}
      <div classname='playlist-comments__container'>
        <form onSubmit={onSubmit}>
          <div className="playlist-CommentsInputContainer">
            <div>{selectedComments?.length} Reviews</div>
            <div className='playlist-input_div'>
              <input
                type="text"
                name="Comments"
                placeholder='Add a public review...'
                onChange={updateComment}
                value={comment}
              ></input>
            </div>
          </div>
        </form>
        <div className='playlist-comments__outer'>
          {selectedComments?.map((comment) => {
            return <div className='playlist-comments'>
              <div className='playlist-comment_image'>
                {comment?.userProfileURL ? <img src={`${comment?.userProfileURL}`} />
                  : <div>
                    <Avatar className={classes.orange}>{comment?.username && comment?.username[0]}</Avatar>
                  </div>}
              </div>
              <div className='playlist-username-comment__container'>
                <div className='playlist-comment_username'>{comment?.username}</div>
                <div className='playlist-comment_comment'>{comment?.comment}</div>
              </div>
              <div>
                {user && user?.id === comment?.user_id ? <button className='playlist-delete-comment' onClick={(e) => onDelete(e, comment?.id)}>🗑</button> : ''}
              </div>
            </div>
          })}
        </div>
      </div>
      <div className="controls">
        <div className="player_image">
          <img src={`${currentSong?.image_url}`}></img>
        </div>
        <div className='player_songInfo'>
          <div className='player_artist'>{currentSong?.artist}</div>
          <div className='player_song'>{currentSong?.title}</div>
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
        <div className='likeBtn'>{likes?.includes(currentSong?.id) ? <button id={`${currentSong?.id}`} onClick={(e) => handleRemoveLike(e, currentSong?.id)}>❤️</button> : <button id={`${currentSong?.id}`} onClick={(e) => handleAddLike(e, currentSong?.id)}>🤍</button>}</div>
      </div>
    </div>
  )
}



export default Playlist;