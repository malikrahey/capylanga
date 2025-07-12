// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getVertexAI } from "firebase/vertexai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByJvaNDfhSroaExTQzrap_sXuHzMmvKbg",
  authDomain: "capylanga.firebaseapp.com",
  projectId: "capylanga",
  storageBucket: "capylanga.appspot.com",
  messagingSenderId: "183625982823",
  appId: "1:183625982823:web:8b32a7a46964bdbf3545c2",
  measurementId: "G-N0C2Z58Z0N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
const vertexai = getVertexAI(app, {
  project: firebaseConfig.projectId,
});

export { db, functions, vertexai };