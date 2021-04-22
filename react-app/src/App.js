import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import Home from "./components/Home/index";
import Profile from "./components/Profile/index";
import UserSongPage from './components/UserSongPage/index';
import SongPage from './components/SongPage/index';
import './index.css';


function App() {
  const dispatch = useDispatch();
  // const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(true);

  useEffect(async () => {
        const user = sessionActions.restoreUser();
        if (!user.errors) {
            dispatch(sessionActions.restoreUser());
            // setAuthenticated(true);
            
        }
        // setLoaded(true);
    }, [dispatch]);


  return (
    <>
      <NavBar
          loaded={loaded}
      
      />
      <Switch>
        <Route exact={true} path='/'>
          <Home loaded={loaded} />
        </Route>
        <Route exact={true} path='/profile' >
          <Profile loaded={loaded}/>
        </Route>
        <Route path='/user/songs/:songId'>
            <UserSongPage loaded={loaded}/>
          </Route>
        <Route path='/songs/:songId'>
            <SongPage loaded={loaded}/>
          </Route>
      </Switch> 
    
    </>
  );
}

export default App;
