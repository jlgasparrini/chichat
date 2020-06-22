import React, { useState, useEffect } from 'react';
import logo from 'logo.png';
import { Button } from '@material-ui/core';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import ReactCodeInput from 'react-verification-code-input';
import { sendSMS, confirmSMS } from 'helpers/firebase';

const ARGENTINA = "AR";

const Login = ({ history }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState([]);
  const [requestPhone, setRequestPhone] = useState(true);

  useEffect(() => {
    if (!requestPhone) {
      confirmSMS(code, () => history.push('/chat'));
    }
  }, [code]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1 style={{ fontFamily: 'cursive' }}>
          CHICHAT
        </h1>

        <h2>
          WHERE BULLYING HAPPENS
        </h2>
        {
          requestPhone ? (
            <>
              <p style={{ fontFamily: 'italic' }}>
                Now, I need your phone number! Come on...
              </p>

              <div id='recaptcha-container' />

              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                defaultCountry={ARGENTINA}/>

              <hr/>
              <Button
                variant="contained"
                size="large"
                onClick={() => sendSMS(phone, () => setRequestPhone(false))}
              >
                Send me code
              </Button>
            </>
          ) : (
            <>
              <p style={{ fontFamily: 'italic' }}>
                Check your phone, you have a SMS with a code.
              </p>

              <ReactCodeInput onComplete={(code) => setCode(code)}/>
            </>
          )
        }
      </header>
    </div>
  );
}

export default Login;
