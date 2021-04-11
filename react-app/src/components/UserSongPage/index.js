import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import './UserSongPage.css';
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

function UserSongPage() {

  const classes = useStyles();

  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const genres = useSelector((state) => state?.genre.genres);
  const comments = useSelector((state) => state.comments);
  const [currentSong, setCurrentSong] = useState('');
  // const [playing, setPlaying] = useState(false)
  const [comment, setComment] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [likesChanged ,setLikesChanged ] = useState(false)
  
	const selectedSong = useSelector((state) => state?.song && Object.values(state?.song).find((song) => song?.id === parseInt(id)));
  console.log(selectedSong)
	const selectedGenre = genres?.find((genre) => genre.id === selectedSong?.genre_id)
  const filteredSongs = Object.values(songs).filter((song) => song.user_id === selectedSong?.user_id)
  const selectedComments = Object.values(comments).filter((comment) => comment.song_id === selectedSong?.id)
  
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);


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

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(`${selectedSong?.audio_file}`);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
    
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
  


    
    const onDelete = (e, commentId) => {
      console.log(commentId)
        e.preventDefault()
        dispatch(commentActions.deleteExistingComment(commentId))
        setDeleted(false)
        setTimeout(() => {
            setDeleted(true)
          }, 100);
        }
        
    
    const updateComment = (e) => {
      setComment(e.target.value);
    };
    
    const onClick = (songId) => {
      
      // e.stopPropagation();
      const to = `/user/songs/${songId}`;
      history.push(to);
      handlePlayPause()
      };
      
      const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', user.id)
      formData.append("songId", selectedSong.id);
      formData.append("comment", comment);
      
      await dispatch(commentActions.addNewComment(formData));
      setComment('');
    }
    
    
    useEffect(() => {
      dispatch(musicActions.findExistingSongs())
      dispatch(commentActions.findExistingComments())
    }, [dispatch, deleted])
  
    useEffect(() => {
      dispatch(genreActions.findAllGenres())
    }, [dispatch])
  
    

  
  return (
    <div className='song__page'>
        <div className='song__banner'>
          <div>
              <div className='song__genre--info'>
                <button className='playBtn1' onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
                <div>
                  <div className='sinecloud__div'>Genre:</div>
                  <div className='genre__div'>{selectedGenre?.name}</div>
                </div>
              </div>
              <div className='song__banner--spacer'></div>
              <div className='tracks__circle'>
                {!selectedSong?.userProfileURL ? (
                          <div>
                              {selectedSong?.username[0]}
                          </div>
                        ) :
                      (
                        <img
                            className="profile__image"
                            src={`${selectedSong?.userProfileURL}`}
                            alt="profile-server"
                        />
                      )}
              </div>
          </div>
          <div>
              <div className='selected__artist'>{selectedSong?.artist}</div>
              <div className='selected__title'>{selectedSong?.title}</div>
              <div id="waveform" ref={waveformRef} />
          </div>
          <div className='tracks__img'>
            <img src={`${selectedSong?.image_url}`}/>
          </div>
        </div>
        <div className='list__spacer'>
          <h2>Uploads</h2>
        </div>

        {filteredSongs?.map((song) => {
          return  (<div className='song__list' >
            <div className='oneSong__outer' onClick={() => {onClick(song.id);}}>
              <div className='oneSong__inner' >
                <div className='song__logo--container'>
                  <div className='song__logo1'>
                    <img src={`${song?.image_url}`}/>
                  </div>
                  <div id={`${song?.audio_file}`} onClick={audio.togglePlay} className="song__logo2"></div>
                </div>
                <div className='artist__name' onClick={() => onClick(song.id)}>{` ${song.artist} `}</div>
                <div className='song_name' onClick={() => onClick(song.id)}>-- {` ${song.title} `}</div>
                <div className='song_spacer'></div>
                </div>
              <div className='additional__controls'>
                {likes?.includes(song.id) ? <button id={`${song.id}`} onClick={(e) => handleRemoveLike(e, song?.id)}>❤️</button> : <button id={`${song.id}`} onClick={(e) => handleAddLike(e, song?.id)}>🤍</button>}
                <button>🔁</button>
                <button>🔘🔘🔘</button>
              </div>
            </div>
        </div>)
        })}
        <div classname='comments__container'>
          <form onSubmit={onSubmit}>
            <div className="CommentsInputContainer">
              <div>{selectedComments.length} Reviews</div>
              <div className='input_div'>
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
          <div className='comments__outer'>
            {selectedComments.map((comment) => {
              return <div className='comments'>
                <div className='comment_image'>
                    {comment?.userProfileURL ? <img src={`${comment?.userProfileURL}`} /> 
                              : <div>
                                    <Avatar className={classes.orange}>{comment?.username[0]}</Avatar>
                                </div>}
                </div>
                <div className='username-comment__container'>
                  <div className='comment_username'>{comment.username}</div>
                  <div className='comment_comment'>{comment.comment}</div>
                </div>
                <div>
                    {user && user?.id === comment?.user_id ? <button className='delete-comment' onClick={(e) => onDelete(e, comment?.id)}>🗑</button>: ''}
                </div>
              </div>
            })}
          </div>
        </div>
        <div  className="controls">
          
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
          <div className='likeBtn'>{likes?.includes(selectedSong?.id) ? <button id={`${selectedSong?.id}`} onClick={(e) => handleRemoveLike(e, selectedSong?.id)}>❤️</button> : <button id={`${selectedSong?.id}`} onClick={(e) => handleAddLike(e, selectedSong?.id)}>🤍</button>}</div>
      </div>
    </div>
  )
}



export default UserSongPage;