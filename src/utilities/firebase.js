import React, {useState, useEffect} from 'react';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from "../config/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("firebase app ran");
console.log(process.env.REACT_APP_API_KEY);
console.log(process.env.REACT_APP_TEST);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(() => user));

        return unsub;
    }, []);

    return currentUser;
};