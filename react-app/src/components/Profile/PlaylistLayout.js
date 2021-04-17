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
import { useParams } from 'react-router-dom';
import Playlist from './Playlist';
import './PlaylistLayout.css';



function PlaylistLayout() {


  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state?.song);
  const user = useSelector((state) => state?.session.user);
  const likes = useSelector((state) => state?.likes);
  const genres = useSelector((state) => state?.genre.genres);
  const followings = useSelector((state) => state?.follows.followers);
  const playlistSongs = useSelector((state) => state?.playlists)

  const playlists = playlistSongs.filter((playlistSong) => playlistSong.song_id === null)
  
  const [followsChanged, setFollowsChanged] = useState(false);
  
  const [openPlaylist, setOpenPlaylist] = useState(false);
  

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
  }, [dispatch])

  
  const OpenPlaylist = (event, idx) => {
    event.stopPropagation()
    setOpenPlaylist(idx);
  }


  return (
    <div className='playlists__page'>
      <div className='playlists-area'>
        {playlists.map((playlist, idx) => {
          return (
            <div className='playlist-names-outer'>
              <div className='playlist-names' onClick={(event) => OpenPlaylist(event, idx)}>
                {playlist.name}
              </div>
            </div>
          )
        })}
        <div className='playlist-area'>
          {playlists.map((playlist, idx) => {
            return (
              
                <div className='playlist'>
                  {openPlaylist === idx && <Playlist playlist={playlist} />}
                </div>
              
            )
          })}
        </div>
              
      </div>
      
    </div>
  )
}



export default PlaylistLayout;