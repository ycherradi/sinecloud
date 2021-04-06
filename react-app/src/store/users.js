
const FIND_USERS = 'song/findUser';

const findUsers = (users) => ({
    type: FIND_USERS,
    users,
});


export const findExistingUsers = () => async (dispatch) => {
    const response = await fetch('/api/users');
    const users = await response.json();
    dispatch(findUsers(users));
};

const initialState = { user: null };

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_USERS:
            return action.users;  
    default:
      return state;
  }
};

export default usersReducer;
