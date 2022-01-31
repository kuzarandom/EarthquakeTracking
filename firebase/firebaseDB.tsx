// Import the functions you need from the SDKs you need
import  { initializeApp } from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function loadFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBa3TNGQ8UUqHNiJDaYn8E8_URyXEJ9TVw",
    authDomain: "warningharzard-8b915.firebaseapp.com",
    projectId: "warningharzard-8b915",
    storageBucket: "warningharzard-8b915.appspot.com",
    messagingSenderId: "785280387022",
    appId: "1:785280387022:web:f5e28c0391e291c7b0cd9f",
    measurementId: "G-G6NBYYZ8Y7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return app
}

