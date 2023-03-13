// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDchrGRjUaLCw9V5IlQ_glbq47cDs_XAgY",
  authDomain: "react-chat-app-a4e1e.firebaseapp.com",
  projectId: "react-chat-app-a4e1e",
  storageBucket: "react-chat-app-a4e1e.appspot.com",
  messagingSenderId: "599304958054",
  appId: "1:599304958054:web:c3a3ad0511882958d03da7",
  measurementId: "G-DC0R9ESCHQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();