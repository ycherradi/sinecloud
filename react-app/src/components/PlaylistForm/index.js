import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as playlistActions from '../../store/playlist';
import './PlaylistForm.css';

const PlaylistForm = ({
  closeModalPlaylist
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const history = useHistory();
  const user = useSelector((state) => state?.session.user)

  const onPlaylist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(playlistActions.addPlaylist(name, user.id))
    closeModalPlaylist()
  }

  const updateName = (e) => {
    setName(e.target.value);
  };


  return (
    <div className="PlaylistModalWrapper">
      <div className="PlaylistModalContainer">
        <div className="PlaylistModalFormTitleContainer">
          <div className="PlaylistModalFormTitle">Create a Playlist</div>
        </div>
        <form onSubmit={onPlaylist}>
          {/* <div className="PlaylistErrorModalContainer">
            {errors.map((error) => (
              <div className="Playlist-errors__container">
                {error}
              </div>
            ))}
          </div> */}
          <div className="PlaylistModalInputContainer">
            <label htmlFor="playlist">Playlist</label>
            <input
              name="playlist"
              type="text"
              placeholder="Playlist Name"
              value={name}
              onChange={updateName}
              required
            />
          </div>
          <div className="PlaylistModalButtonContainer">
            <button className="PlaylistModalSubmit__form" type="submit">
              Create Playlist
                        </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaylistForm;
