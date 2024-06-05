import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb9dfUprWRiIK0tNaNAgKj5hKJNbuSot0",
  authDomain: "patahome-d60d5.firebaseapp.com",
  projectId: "patahome-d60d5",
  storageBucket: "patahome-d60d5.appspot.com",
  messagingSenderId: "731867909892",
  appId: "1:731867909892:web:3b6a154cfd5938d4fe8a51",
  measurementId: "G-3PN7M2J5CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize analytics only on the client-side
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    const analytics = getAnalytics(app);
    // Now you can use analytics on the client-side
    // ...
  });
}

export { app, auth };
