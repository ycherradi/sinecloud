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

  
  const [deleted, setDeleted] = useState(false);
  const [followsChanged, setFollowsChanged] = useState(false);
  const [likesChanged, setLikesChanged] = useState(false);
  const [modalIsOpenPlaylist, setIsOpenPlaylist] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const selectedSong = Object.values(songs).find((song) => song?.id === parseInt(songId));
  const selectedGenre = genres?.find((genre) => genre?.id === selectedSong?.genre_id)
  const filteredSongs = Object.values(songs).filter((song) => song?.artist === selectedSong?.artist)
  // const selectedComments = Object.values(comments).filter((comment) => comment.song_id === selectedSong?.id)
  const selectedComments = useSelector((state) => state?.comments && Object.values(state?.comments).filter((comment) => comment?.song_id === selectedSong?.id))
  const isFollowed = followings?.find((following) => following.id === selectedSong?.user_id)
  console.log(isFollowed)




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

  
  const OpenPlaylist = () => {
    setOpenPlaylist(true);
  }


  return (
    <div className='playlists__page'>
      <div className='playlists-area'>
        {playlists.map((playlist) => {
          return (
            <div>
              <div onClick={OpenPlaylist}>
                {playlist.name}
              </div>
              <div>
                {openPlaylist && <Playlist playlist={playlist}/>}
              </div>  
            </div>
          )
        })}
      </div>
      
    </div>
  )
}



export default PlaylistLayout;