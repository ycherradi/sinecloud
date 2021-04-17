const FIND_USER_PLAYLIST = 'song/findUserPlaylists';
const REMOVE_USER_PLAYLIST = 'song/removeUserPlaylists';

const findUserPlaylists = (userPlaylists) => ({
  type: FIND_USER_PLAYLIST,
  userPlaylists,
});

const removeUserPlaylists = () => ({
  type: REMOVE_USER_PLAYLIST,
});

export const fetchUserPlaylists = (userId) => async (dispatch) => {
  console.log(userId)
  if (!userId) return;
  const response = await fetch('/api/playlists/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userId),
  });
  const userPlaylists = await response.json();
  console.log(userPlaylists)
  return dispatch(findUserPlaylists(userPlaylists));
};


export const addPlaylist = (name, userId) => async (dispatch) => {
  console.log(name, userId)
  const response = await fetch('/api/playlists/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, userId}),
  });
  const userPlaylists = await response.json();
  console.log('userPlaylists', userPlaylists)
  return dispatch(findUserPlaylists(userPlaylists));
};

export const addToPlaylist = (name, songId, userId) => async (dispatch) => {
  console.log(name, songId, userId)
  const response = await fetch('/api/playlists/playlist/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, songId, userId }),
  });
  const userPlaylists = await response.json();
  console.log('userPlaylists', userPlaylists)
  return dispatch(findUserPlaylists(userPlaylists));
};

export const removefromPlaylist = (playlistName, songId, userId) => async (dispatch) => {
  const response = await fetch('/api/playlists/playlist/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playlistName, songId, userId}),
  });
  const userPlaylists = await response.json();
  return dispatch(findUserPlaylists(userPlaylists));
};

export const removePlaylist = (name, userId) => async (dispatch) => {
  const response = await fetch('/api/playlists/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, userId }),
  });
  const userPlaylists = await response.json();
  return dispatch(findUserPlaylists(userPlaylists));
};



const playlistsReducer = (state = [], action) => {
  switch (action.type) {
    case FIND_USER_PLAYLIST:
      return action.userPlaylists;
    case REMOVE_USER_PLAYLIST:
      const newState = []
      return newState;
    default:
      return state;
  }
};

export default playlistsReducer;
