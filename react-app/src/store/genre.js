const FIND_GENRES = 'song/findGenre';


const findGenres = (genres) => ({
    type: FIND_GENRES,
    genres,
});



export const findAllGenres = () => async (dispatch) => {
    const response = await fetch('/api/genres/')
    const genres = await response.json();
    dispatch(findGenres(genres));
    return genres;
};



const initialState = {};
const genreReducer = (state = initialState, action) => {
    switch (action.type) {

        case FIND_GENRES:
            return action.genres;

        default:
            return state;
    }
};

export default genreReducer;