import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Home from "./components/Home/index";
import Profile from "./components/Profile/index";
import Footer from "./components/Footer/index";
import UserSongPage from './components/UserSongPage/index';
import SongPage from './components/SongPage/index';
import './index.css';


function App() {
  const dispatch = useDispatch();
  // const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(authenticate());
        // setAuthenticated(true);
      }
      setLoaded(true); 
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

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
        <Route path='/user/songs/:id'>
            <UserSongPage loaded={loaded}/>
          </Route>
        <Route path='/songs/:id'>
            <SongPage loaded={loaded}/>
          </Route>
      </Switch> 
      <Footer/>
    </>
  );
}

export default App;
