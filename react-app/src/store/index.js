import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songReducer from "./song";
import genreReducer from "./genre";
import likesReducer from "./likes";
import usersReducer from "./users";
import commentReducer from "./comments";
import followsReducer from './follows';


const rootReducer = combineReducers({
  session: sessionReducer,
  song: songReducer,
  genre: genreReducer,
  likes: likesReducer,
  users: usersReducer,
  comments: commentReducer,
  follows: followsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
