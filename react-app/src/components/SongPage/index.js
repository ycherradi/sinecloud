import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux"
import * as musicActions from '../../store/song';
import './SongPage.css';
import * as genreActions from '../../store/genre';
import * as likeActions from '../../store/likes';
import * as commentActions from '../../store/comments';
import * as followActions from '../../store/follows';
import * as sessionActions from '../../store/session';
import * as playlistActions from '../../store/playlist';
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
import Modal from 'react-modal';
import PlaylistForm from '../PlaylistForm/index';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

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

function SongPage() {

  const classes = useStyles();

  let { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const genres = useSelector((state) => state?.genre.genres);
  const followings = useSelector((state) => state?.follows.followers);
  const playlistSongs = useSelector((state) => state?.playlists)

  const playlists = playlistSongs.filter((playlistSong) => playlistSong.song_id === null)
  
  // const comments = useSelector((state) => state.comments);
  const [currentSong, setCurrentSong] = useState('');
  // const [playing, setPlaying] = useState(false)
  const [comment, setComment] = useState("");
  // const [commentsChanged, setCommentsChanged] = useState(false)
  const [deleted, setDeleted] = useState(false);
  const [followsChanged, setFollowsChanged] = useState(false);
  const [likesChanged ,setLikesChanged ] = useState(false);
  const [modalIsOpenPlaylist, setIsOpenPlaylist] = useState(false);

  
  const [menu, setMenu] = useState(false)
  
	const selectedSong = Object.values(songs).find((song) => song?.id === parseInt(songId));
	const selectedGenre = genres?.find((genre) => genre?.id === selectedSong?.genre_id)
  const filteredSongs = Object.values(songs).filter((song) => song?.artist === selectedSong?.artist)
  // const selectedComments = Object.values(comments).filter((comment) => comment.song_id === selectedSong?.id)
  const selectedComments = useSelector((state) => state?.comments && Object.values(state?.comments).filter((comment) => comment?.song_id === selectedSong?.id))
  const isFollowed = followings?.find((following) => following.id === selectedSong?.user_id)
  
  

  const handleClick = (event) => {
    event.stopPropagation()
  
  };



  const openPlaylistForm = (event) => {
    event.stopPropagation()
    openModalPlaylist()
  }

  const addToPlaylist = (event, name, songId) => {
    dispatch(playlistActions.addToPlaylist(name, songId, user.id))
    event.stopPropagation()

  }


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
  


    const updateComment = (e) => {
      setComment(e.target.value);
    };


    const onDelete = (e, commentId) => {
   
        e.preventDefault()
        dispatch(commentActions.deleteExistingComment(commentId))
        // setCommentsChanged(true) 
        setTimeout(() => {
            setDeleted(true)
          }, 100);
    }

    const onClick = (songId) => {
      
      // e.stopPropagation();
        const to = `/songs/${songId}`;
        history.push(to);
        
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
    setTimeout(()=> {
      setFollowsChanged(true);

    }, 100)
    
  }


  const offFollow = (e, artistId) => {
    e.stopPropagation()
    dispatch(followActions.removeFollow(user.id, artistId));
    
  }

  function openModalPlaylist() {
    // e.stopPropagation();
    setIsOpenPlaylist(true);
  }

  function closeModalPlaylist() {
    // e.stopPropagation();
    setIsOpenPlaylist(false);
  }

  
  
  useEffect(() => {
    dispatch(followActions.fetchUserFollows(user?.id))
    dispatch(playlistActions.fetchUserPlaylists(user?.id))
    setFollowsChanged(false)
  }, [dispatch, user, followsChanged])


  useEffect(() => {
    dispatch(musicActions.findExistingSongs())

  }, [dispatch, menu])
  

  useEffect(() => {
    dispatch(genreActions.findAllGenres())
    dispatch(commentActions.findExistingComments())
  }, [dispatch, deleted])
  
  let tempSongId;

  
  return (
    <div className='song__page' >
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
                  {filteredSongs.length} Tracks
              </div>
          </div>
          <div>
              <div className='selected__artist'>{selectedSong?.artist}</div>
              <div className='selected__title'>{selectedSong?.title}</div>
              <div id="container">
                <div id="waveform" ref={waveformRef} />
              </div>
          </div>
          <div className='tracks__img'>
            <img src={`${selectedSong?.image_url}`}/>
          </div>
        </div>
        <div className='list__spacer'>
          <div className='profile__circle'>
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
        {isFollowed ? <div className='follow' onClick={(e) => offFollow(e, selectedSong?.user_id)}>unFollow</div> : <div className='follow' onClick={(e) => onFollow(e, selectedSong?.user_id)}>+ Follow</div>}
            
        </div>
          <div className='songs-area'>
              {filteredSongs?.map((song) => {
                return  (<div className='song__list' >
                  <div className='oneSong__outer' onClick={() => {onClick(song.id);
                                                                  handlePlayPause()}}>
                    <div className='oneSong__inner' >
                      <div className='song__logo--container'>
                        <div className='song__logo1'>
                          <img src={`${song?.image_url}`} />
                        </div>
                        <div id={`${song?.audio_file}`} onClick={handlePlayPause} className="song__logo2"></div>
                      </div>
                      <div className='artist__name' onClick={() => onClick(song.id)}>{` ${song.artist} `}</div>
                      <div className='song_name' onClick={() => onClick(song.id)}>-- {` ${song.title} `}</div>
                      <div className='song_spacer'></div>
                      </div>
                    <div className='additional__controls'>
                      {likes?.includes(song.id) ? <button id={`${song.id}`} onClick={(e) => handleRemoveLike(e, song?.id)}>❤️</button> : <button id={`${song.id}`} onClick={(e) => handleAddLike(e, song?.id)}>🤍</button>}
                      <button>🔁</button>
                      <button onClick={handleClick} className='menuBtn'>
                      <Wrapper
                        className='MyMenuButton'
                        // onSelection={handleSelection}
                      >
                        <Button className='MyMenuButton-button'>
                          + Playlist
                        </Button>
                        <Menu className='MyMenuButton-menu'>
                          <ul> {playlists?.map((playlist) => {
                            return (

                              <li onClick={(event) => addToPlaylist(event, playlist?.name, song.id)}>
                                {playlist?.name}
                              </li>
                            )
                          })}
                          
                          <li onClick={openPlaylistForm}>Create Playlist </li>
                          </ul>
                        </Menu>

                      </Wrapper>
                      </button>
                      <Modal
                        isOpen={modalIsOpenPlaylist}
                        onRequestClose={closeModalPlaylist}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <PlaylistForm
                          closeModalPlaylist={closeModalPlaylist}
                          openModalPlaylist={openModalPlaylist}
                        />
                      </Modal>
                    </div>
                  </div>
              </div>)
              })}
          </div>
      
        {/* {selectedSong && <ReactJkMusicPlayer 
              id='audio-element'
              {...params}
                  
        />} */}
        <div classname='comments__container'>
          <form onSubmit={onSubmit}>
            <div className="CommentsInputContainer">
              <div>{selectedComments?.length} Reviews</div>
              <div className='input_div'>
                <input
                  type="text"
                  name="Comments"
                  placeholder='Add a public review then press enter...'
                  onChange={updateComment}
                  value={comment}
                ></input>
              </div>
            </div>
          </form>
          <div className='comments__outer'>
            {selectedComments?.map((comment) => {
              return <div className='comments'>
                <div className='comment_image'>
                    { comment?.userProfileURL ? <img src={`${comment?.userProfileURL}`} /> 
                              : <div>
                                    <Avatar className={classes.orange}>{comment?.username && comment?.username[0]}</Avatar>
                                </div>}
                </div>
                <div className='username-comment__container'>
                  <div className='comment_username'>{comment?.username}</div>
                  <div className='comment_comment'>{comment?.comment}</div>
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



export default SongPage;