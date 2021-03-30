import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Home from "./components/Home/index";
import Profile from "./components/Profile/index";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      // setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
        <NavBar
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/profile' >
            <Profile />
          </Route>
        </Switch> 
    </>
  );
}

export default App;
