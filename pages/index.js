import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import googleLogo from '../public/google.png';
import githubLogo from '../public/github.png';
import backgroundImage from '../public/background.jpeg';

const words = ["Bungalows", "Apartments", "Mansions", "Villas", "Builder plots"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = 'https://bit.ly/patahome';
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = 'https://bit.ly/patahome';
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
    <div className="App" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <header className="App-header">
        <h1>PATAHOME</h1>
        <p>Buy or rent your DREAM home today</p>
        <div className="login-card">
          <button onClick={signInWithGoogle}>
            <img src={googleLogo.src} alt="Google logo" />
            Login with Google
          </button>
          <button onClick={signInWithGithub}>
            <img src={githubLogo.src} alt="Github logo" />
            Login with Github
          </button>
        </div>
        <p>Explore: {`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? ' ' : ''}`}</p>
      </header>
    </div>
  );
}
