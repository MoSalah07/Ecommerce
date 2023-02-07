// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: "e-commerce-4ef54.firebaseapp.com",
  projectId: "e-commerce-4ef54",
  storageBucket: "e-commerce-4ef54.appspot.com",
  messagingSenderId: "858857607782",
  appId: "1:858857607782:web:a95d9dbcebe3067b2ad3a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
