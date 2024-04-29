"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "./AuthContext";
const DataContext = createContext(null);

function DataProvider({ children }) {
  const { user } = useAuth();

  async function uploadToDB(store, id, data) {
    try {
      await setDoc(doc(collection(db, store), id), data);
    } catch (err) {
      console.log(err);
    }
  }

  const [userData, setUserData] = useState(null);
  async function getUserFromDB() {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
      return docSnap.data();
    } else {
      return null;
    }
  }
  useEffect(() => {
    getUserFromDB();
  }, [user]);

  return (
    <DataContext.Provider value={{ uploadToDB, userData }}>
      {children}
    </DataContext.Provider>
  );
}

export default function useData() {
  return useContext(DataContext);
}
export { DataProvider };
