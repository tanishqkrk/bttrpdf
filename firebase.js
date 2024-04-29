// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX9Wv0WNCbijiiV0RwgDGMtpU3wSg56sY",
  authDomain: "bttrpdf.firebaseapp.com",
  projectId: "bttrpdf",
  storageBucket: "bttrpdf.appspot.com",
  messagingSenderId: "617500859261",
  appId: "1:617500859261:web:936f00c9e88deead908a14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
