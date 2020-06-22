import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth } from 'helpers/firebase';
import { PrivateRoute, PublicRoute } from 'helpers/routes';
import Landing from 'views/Landing';
import Login from 'views/Login';
import Chat from 'views/Chat';
import Loading from 'components/Loading';
import 'App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setLoading(false);
        setAuthenticated(true);
      } else {
        setLoading(false);
        setAuthenticated(false);
      }
    });
  }, []);

  return loading === true ? <Loading /> : (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
        <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
