import React, { useState, useEffect } from 'react';


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, updateProfile, reauthenticateWithCredential, updatePassword, deleteUser } from "firebase/auth";

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

    const checkCommonError = (errCode) => {
        if (errCode === "auth/network-request-failed") {
            return [false, "Network error"];
        }

        if (errCode === "auth/too-many-requests") {
            return [false, "Too many request, try again later"];
        }

        if (errCode === "auth/web-storage-unsupported") {
            return [false, "Error, please enable your browser's web storage"];
        }

        return null;
    };

    const signUp = async (displayName, email, password, navigate) => {
        try {

            const res = await createUserWithEmailAndPassword(auth, email, password);

            navigate("/");

            const user = res.user;

            // Update profile fpr firebase authentication
            await updateProfile(user, {
                displayName
            });

            // Insert details to database
            await set(ref(firebaseDatabase, `users/${user.uid}`), {
                displayName,
                email
            });

            // return res;
            return [true, null];
        } catch (error) {
            console.log(error);

            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            if (errCode === "auth/email-already-in-use") {
                return [false, "An account with this email already exists!"];
            }

            if (errCode === "auth/invalid-email") {
                return [false, "Invalid email"];
            }

            if (errCode === "auth/weak-password") {
                return [false, "Password is too weak"];
            }

            return [false, "Something went wrong."];
        }
    };

    const login = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            return [true, null];
        } catch (error) {
            console.log(error);
            
            const errCode = error.code;
            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            if (errCode === "auth/email-already-in-use") {
                return [false, "An account with this email already exists!"];
            }

            if (errCode === "auth/invalid-email") {
                return [false, "Invalid email"];
            }

            if (errCode === "auth/user-disabled") {
                return [false, "Your account has been disabled."];
            }

            if (errCode === "auth/wrong-password" || errCode === "auth/user-not-found") {
                return [false, "Invalid email or password"];
            }

            return [false, "Something went wrong."];
        }
    };

    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
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

    const deleteAccount = async (password) => {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            await reauthenticateWithCredential(auth.currentUser, credential);
            await deleteUser(auth.currentUser);

            return [true, null];
        } catch (error) {
            console.log(error);
            console.log(error.code);

            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            if (errCode === "auth/wrong-password") {
                return [false, "Invalid password"];
            }
            return [false, "Something went wrong."];
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);

            return [true, null];

        } catch (error) {
            console.log(error);
            console.log(error.code);

            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            if (errCode === "auth/wrong-password") {
                return [false, "Invalid password"];
            }
            return [false, "Something went wrong."];
        }
    };

    const getCurrentUser = () => {
        try {
            const res = auth.currentUser;
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const updateUserProfile = async (displayName) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName
            });

            return [true, null];
        } catch (error) {
            console.log(error);
            return [false, error];
        }

    };

    return {
        signUp,
        login,
        logout,
        deleteAccount,
        changePassword,
        getCurrentUser,
        updateUserProfile
    }
})();


export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(() => user);
            setLoading(() => false);
        });

        return unsub;
    }, []);
    return [currentUser, loading, setCurrentUser];
};