import React from 'react';
import logo from 'logo.png';
import { Button } from '@material-ui/core';

const Landing = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <h1 style={{ fontFamily: 'cursive' }}>
        CHICHAT
      </h1>

      <h2>
        WHERE BULLYING HAPPENS
      </h2>
      <p style={{ fontFamily: 'italic' }}>
        I'm joking, just to talk with your friends! You know...
        Don't be a disrespectful motherfuc***.
      </p>

      <Button variant="contained" size="large">
        Touch to joke with your friends
      </Button>
    </header>
  </div>
)

export default Landing;
