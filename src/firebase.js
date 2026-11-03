// Firebase configuration for Dripzy Store

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDDEdtCRg7Ugd5OKQEwtjobyQ6VgdYmdSc",
  authDomain: "dripzystore-website.firebaseapp.com",
  projectId: "dripzystore-website",
  storageBucket: "dripzystore-website.firebasestorage.app",
  messagingSenderId: "811601937427",
  appId: "1:811601937427:web:34a3c1b543fd94dffe6be6",
  measurementId: "G-EP66TCXXYJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
