import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleLogo from './logo_google.png';
import githubLogo from './github_icon.png';
import backgroundImage from './background.jpg';

const firebaseConfig = {
  apiKey: "AIzaSyCb9dfUprWRiIK0tNaNAgKj5hKJNbuSot0",
  authDomain: "patahome-d60d5.firebaseapp.com",
  projectId: "patahome-d60d5",
  storageBucket: "patahome-d60d5.appspot.com",
  messagingSenderId: "731867909892",
  appId: "1:731867909892:web:3b6a154cfd5938d4fe8a51",
  measurementId: "G-3PN7M2J5CY"
};

firebase.initializeApp(firebaseConfig);

const words = ["Bungalows", "Apartments", "Mansions", "Villas", "Builder plots"];

function App() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => {
      window.location.href = 'https://bit.ly/patahome';
    });
  };

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider).then(() => {
      window.location.href = 'https://bit.ly/patahome';
    });
  };

  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        <h1>PATAHOME</h1>
        <p>Buy or rent your DREAM home today</p>
        <div className="login-card">
          <button onClick={signInWithGoogle}>
            <img src={googleLogo} alt="Google logo" />
            Login with Google
          </button>
          <button onClick={signInWithGithub}>
            <img src={githubLogo} alt="Github logo" />
            Login with Github
          </button>
        </div>
        <p>Explore: {`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? ' ' : ''}`}</p>
      </header>
    </div>
  );
}

export default App;