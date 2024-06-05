import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import Head from 'next/head';
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
    try {
      await signInWithPopup(auth, provider);
      window.location.href = 'https://bit.ly/patahome'; // Redirect on success
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setSignInError('Please complete the sign-in process in the popup window.');
      } else {
        setSignInError('An error occurred during sign-in. Please try again.');
      }
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = 'https://bit.ly/patahome'; // Redirect on success
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setSignInError('Please complete the sign-in process in the popup window.');
      } else {
        setSignInError('An error occurred during sign-in. Please try again.');
      }
    }
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
    <div className="bg-cover min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}> 
      <Head>
        <title>PATAHOME</title>
        <meta name="description" content="Buy or rent your DREAM home today" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">PATAHOME</h1> {/* White text for better contrast */}
        <p className="text-lg text-white mb-8">Buy or rent your DREAM home today</p> {/* White text for contrast */}

        <div className="login-card bg-white rounded-lg shadow-md p-6">
          <button onClick={signInWithGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <img src={googleLogo.src} alt="Google logo" className="inline-block mr-2" />
            Login with Google
          </button>
          <button onClick={signInWithGithub} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <img src={githubLogo.src} alt="Github logo" className="inline-block mr-2" />
            Login with Github
          </button>
        </div>

        <p className="text-white mt-8">Explore: {`${words[index].substring(0, subIndex)}${subIndex === words[index].length ? ' ' : ''}`}</p> {/* White text for contrast */}
      </header>
    </div>
  );
}
