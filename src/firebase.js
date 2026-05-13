// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq1VtkomsD0AsYkSkokWz6mcYitB52ILk",
  authDomain: "bottle-tracking.firebaseapp.com",
  projectId: "bottle-tracking",
  storageBucket: "bottle-tracking.firebasestorage.app",
  messagingSenderId: "218284980499",
  appId: "1:218284980499:web:2d0f28688ae5e0f38382e6",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// Sign in anonymously once
signInAnonymously(auth)
  .then(() => {
    console.log("Anonymous login successful");
  })
  .catch((error) => {
    console.error("Auth error:", error);
  });

// IMPORTANT: this guarantees auth is ready
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User ready:", user.uid);
  } else {
    console.log("No user yet");
  }
});

export { db, auth };
