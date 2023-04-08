import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.photoURL);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="border border-black"
        placeholder="Email"
      ></input>
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="border border-black"
        type="password"
        placeholder="Password"
      ></input>
      <button
        onClick={signIn}
        className="boder border-black bg-slate-300 w-fit px-3 rounded-full"
      >
        Sign up
      </button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logOut}>Log out</button>
    </div>
  );
}

export default Auth;
