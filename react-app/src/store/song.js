const ADD_SONG = 'song/addSong';
const FIND_SONGS = 'song/findSong';
const DELETE_SONG = 'song/deleteSong';
const EDIT_SONG = 'song/editSong';

const addSong = (newSong) => ({
    type: ADD_SONG,
    newSong,
});

const findSongs = (songs) => ({
    type: FIND_SONGS,
    songs,
});

const deleteSong = () => ({
    type: DELETE_SONG,
});

const editSong = (updatedSong) => ({
    type: EDIT_SONG,
    updatedSong,
});


// check this out
// const SET_USER = "aws/setImg";
// const setUser = (server) => ({
//   type: SET_USER,
//   payload: server,
// });

//add a server
export const addNewSong = (songFormInput) => async (dispatch) => {
    console.log(songFormInput, 'add song');
    // const {
    //   admin_id,
    //   name,
    //   description,
    //   isPublic,
    //   image,
    //   serverCategory,
    // } = serverFormInput;

    const response = await fetch(`/api/songs/`, {
        method: 'POST',
        body: songFormInput,
        // JSON.stringify({
        //   admin_id,
        //   name,
        //   description,
        //   isPublic,
        //   image,
        //   serverCategory,
        // }),
    });
    const data = await response.json();
    console.log(data)
    dispatch(addSong(data));
    return data;
};


// Find existing server in database
export const findExistingSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs/');
    const songs = await response.json();
    console.log(songs)
    dispatch(findSongs(songs));
};

// Delete existing server
export const deleteExistingSong = (songId) => async (dispatch) => {
    await fetch('/api/songs/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(songId),
    });
    dispatch(deleteSong());
};

// Edit existing server
export const updateExistingSong = (songId) => async (dispatch) => {
    console.log(songId);
    const response = await fetch('/api/songs/edit/', {
        method: 'PUT',
        body: songId,
    });
    const updatedSong = await response.json();
    console.log('----------------');
    dispatch(editSong(updatedSong));
};



const initialState = {};
const songReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_SONG:
            return {...state, [action.newSong.id]: action.newSong};

        case FIND_SONGS:
            return action.songs;

        case DELETE_SONG:
            const newState = {};
            return newState;

        case EDIT_SONG:
            return action.updatedSong;

        default:
            return state;
    }
};

export default songReducer;
