// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF113XeCasJX3FYJwZ4I7NNnT7Z8q3y3M",
  authDomain: "proyectoar-demo.firebaseapp.com",
  projectId: "proyectoar-demo",
  storageBucket: "proyectoar-demo.firebasestorage.app",
  messagingSenderId: "939436070530",
  appId: "1:939436070530:web:8117a1444fc3a4d520c69b",
  measurementId: "G-4VWJ1JY9GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
