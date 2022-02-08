import React, { useState, useEffect } from 'react';


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import firebaseConfig from "../config/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

console.log("firebase app ran");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(app);
const auth = getAuth();

export const firebaseFn = (() => {

    const signUp = async (username, email, password) => {
        try {
      

            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            await set(ref(firebaseDatabase, `users/${res.user?.uid}`), {
                username,
                email
            });
          

            // return res;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    
    const login = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            return res;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    
    const logout = async () => {
        try {
            const res = await signOut(auth);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        signUp,
        login,
        logout
    }
})();


export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(() => user));

        return unsub;
    }, []);
    return currentUser;
};