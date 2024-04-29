"use client";

import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext(null);
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
  OAuthCredentialOptions,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
function AuthProvider({ children }) {
  // Functionality goes here

  const [user, setUser] = useState(false);

  async function openAuthGoogle() {
    const googleProvider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, googleProvider);
      return response;
    } catch (err) {
      setAuthEror(true);
      setErrorCode(err.code);
      console.log("ERROR", err);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, openAuthGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
export { AuthProvider };
