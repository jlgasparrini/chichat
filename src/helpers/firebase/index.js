import firebase from 'firebase';

export const initializeFirebase = () => {
  const FIREBASE_CONFIG = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(FIREBASE_CONFIG);
}

export const auth = () => firebase.auth();

export const db = () => firebase.database();

export const sendSMS = (phone, callback) => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
      firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then((confirmationResult) => {

          callback();
          window.confirmationResult = confirmationResult;
        }).catch((error) => {
          console.error('Something went wrong', error);
        });
    }
  });
  window.recaptchaVerifier.render();
}

export const confirmSMS = (code, callback) => {
  window.confirmationResult.confirm(code).then(result => {
    callback();
  });
}
