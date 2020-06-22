import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => authenticated === false
      ? <Component {...props} />
      : <Redirect to='/chat' />}
  />
);

export const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => authenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
  />
);
