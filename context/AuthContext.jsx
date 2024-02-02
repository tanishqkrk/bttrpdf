"use client";

import { useContext, createContext, useState, useEffect } from "react";
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
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userFromDB, setUserFromDB] = useState(null);
  // const [userFromDB, setUserFromDB] = (useState < any) | (null > null);
  const router = useRouter();

  const [authError, setAuthEror] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const path = usePathname();

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

  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // console.log("%cACCOUNT TOUCHED", "color:green;font-size:35px ");
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        openAuthGoogle,
        logOut,
        authError,
        errorCode,
        userFromDB,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
export { AuthProvider };
