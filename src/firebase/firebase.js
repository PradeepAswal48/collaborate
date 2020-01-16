import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAmJj1OozI77xpSLacUCA3RzlXqSW_sKzI",
    authDomain: "collaborate-e6c17.firebaseapp.com",
    databaseURL: "https://collaborate-e6c17.firebaseio.com",
    projectId: "collaborate-e6c17",
    storageBucket: "collaborate-e6c17.appspot.com",
    messagingSenderId: "112282780198",
    appId: "1:112282780198:web:279f86a3d2956a047a1ce7",
    measurementId: "G-KX5W3XRFZJ"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb; 