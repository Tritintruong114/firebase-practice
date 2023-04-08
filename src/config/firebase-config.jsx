import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDjErXaA5Hwoy93A4ydM2lxXccVyWhIbws",
  authDomain: "auth-development-614c0.firebaseapp.com",
  projectId: "auth-development-614c0",
  storageBucket: "auth-development-614c0.appspot.com",
  messagingSenderId: "382462230257",
  appId: "1:382462230257:web:c68078725535fc56bdf350",
  measurementId: "G-CMWT88FRCD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
