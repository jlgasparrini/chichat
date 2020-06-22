import React, { useState, useEffect } from 'react';
import logo from 'logo.png';
import { Button } from '@material-ui/core';
import { auth, db } from 'helpers/firebase';

const Chat = () => {
  const [user] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    db().ref("chats").on("value", snapshot => {
      let chats = [];

      snapshot.forEach((snap) => {
        chats.push(snap.val());
      });

      setChats(chats);
    });
  }, []);

  const submitContent = async (event) => {
    event.preventDefault();

    await db().ref("chats").push({
      content,
      uid: user.uid,
      timestamp: Date.now()
    });

    setContent('');
  }

  console.log('user', user);

  return (
    <div className="App">
      <header className="Chat-header">
        <img src={logo} className="App-logo-header" alt="logo" />
        <div style={{ fontFamily: 'cursive', fontSize: '25px' }}>
          CHICHAT
        </div>
      </header>
      <content>
        <div className="chats">
          {chats.map(chat => {
            return <p key={chat.timestamp}>{chat.content}</p>
          })}
        </div>
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            bottom: 0,
            padding: '10px',
          }}
        >
          <form onSubmit={submitContent}>
            <input onChange={({ target: { value } }) => setContent(value)} value={content}></input>
            <Button type="submit">Send</Button>
          </form>
          <p>
            Login in as: <strong>{user.phoneNumber}</strong>
          </p>
        </div>
      </content>
    </div>
  );
}

export default Chat;
