const ADD_COMMENT = 'song/addComment';
const FIND_COMMENTS = 'song/findComment';
const DELETE_COMMENT = 'song/deleteComment';
const EDIT_COMMENT = 'song/editComment';

const addComment = (newComment) => ({
    type: ADD_COMMENT,
    newComment,
});

const findComments = (comments) => ({
    type: FIND_COMMENTS,
    comments,
});

const deleteComment = () => ({
    type: DELETE_COMMENT,
});

const editComment = (updatedComment) => ({
    type: EDIT_COMMENT,
    updatedComment,
});


//add a song
export const addNewComment = (commentFormInput) => async (dispatch) => {
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: commentFormInput,
    });
    const data = await response.json();

    dispatch(addComment(data));
    return data;
};


// Find existing song in database
export const findExistingComments = () => async (dispatch) => {
    const response = await fetch('/api/comments/');
    const comments = await response.json();
    dispatch(findComments(comments));
};

// Delete existing song
export const deleteExistingComment = (commentId) => async (dispatch) => {
    await fetch('/api/comments/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentId),
    });
    dispatch(deleteComment());
};

// Edit existing song
export const updateExistingComment = (commentId) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'PUT',
        body: commentId,
    });
    const updatedComment = await response.json();
  
    dispatch(editComment(updatedComment));
};



const initialState = {};
const commentReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_COMMENT:
            return {...state, [action.newComment.id]: action.newComment};

        case FIND_COMMENTS:
            return action.comments;

        case DELETE_COMMENT:
            const newState = {}
            return state;

        case EDIT_COMMENT:
            return action.updatedComment;

        default:
            return state;
    }
};

export default commentReducer;
