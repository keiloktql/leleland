import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, updateProfile, reauthenticateWithCredential, updatePassword, deleteUser } from "firebase/auth";

import firebaseConfig from "../config/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push, child, remove, get } from "firebase/database";

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

            const uuid = uuidv4();
            const photoURL = `https://avatars.dicebear.com/api/adventurer-neutral/${uuid}.svg`;

            const res = await createUserWithEmailAndPassword(auth, email, password);

            navigate("/");

            const user = res.user;

            // Update profile fpr firebase authentication
            await updateProfile(user, {
                displayName,
                photoURL
            });

            // Insert details to database
            await set(ref(firebaseDatabase, `users/${user.uid}`), {
                displayName,
                photoURL,
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
            return [true, null];
        } catch (error) {
            console.log(error);

            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            if (errCode === "auth/user-not-found") {
                return [false, "Invalid email"];
            }
            return [false, "Something went wrong."];
        }
    };

    const logout = async (navigate) => {
        try {
            const res = await signOut(auth);
            navigate("/logged-out");
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
                return [false, "Invalid current password"];
            }

            if (errCode === "auth/weak-password") {
                return [false, "Password should be at least 6 characters"];
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

    const updateUserDisplayName = async (displayName) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName
            });

            return [true, null];
        } catch (error) {
            console.log(error);

            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            return [false, error];
        }

    };

    const getLikes = async () => {
        try {
            const snapshot = await get(child(ref(firebaseDatabase), `likes`));

            const convertObjToArr = (data) => {
                return Object.keys(data).map((key) => ({
                    ...data[key],
                    name: key
                }));
            }
            
            let formattedLikes;
            if (snapshot.val() !== null) {
                formattedLikes = convertObjToArr(snapshot.val());
            } else {
                formattedLikes = [];
            }

            console.log(formattedLikes)
            return [true, formattedLikes];
        } catch (error) {
            console.log(error)
            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            return [false, error];
        }
    };

    const likeOrUnlikePost = async (projectID, boolLike) => {
        try {
            const user = auth.currentUser;
            // Insert details to database
            await set(ref(firebaseDatabase, `likes/${projectID}/${user.uid}`), boolLike);

            return [true, null];
        } catch (error) {
            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            return [false, error];
        }
    };

    const postComment = async (projectID, comment) => {
        try {
            const user = auth.currentUser;

            const newCommentKey = push(child(ref(firebaseDatabase), `comments/${projectID}`)).key
            // Insert details to database
            await set(ref(firebaseDatabase, `comments/${projectID}/${newCommentKey}`), {
                comment,
                userID: user.uid,
                photoURL: user.photoURL,
                sender: user.displayName,
                verified: user.emailVerified,
                createdAt: Date.now()
            });

            return [true, null];
        } catch (error) {
            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            return [false, error];
        }
    };

    const deleteComment = async (projectID, commentID) => {
        try {

            await remove(ref(firebaseDatabase, `comments/${projectID}/${commentID}`));
            
            return [true, null];
        } catch (error) {
            const errCode = error.code;

            const commonErrorExist = checkCommonError(errCode);

            if (commonErrorExist) {
                return commonErrorExist;
            }

            return [false, error];
        }
    };

    return {
        signUp,
        login,
        forgotPassword,
        logout,
        deleteAccount,
        changePassword,
        getCurrentUser,
        updateUserDisplayName,
        getLikes,
        likeOrUnlikePost,
        postComment,
        deleteComment
    }
})();


export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let componentMounted = true;
        let unsub;
        (async () => {
            try {
                if (componentMounted) {
                    unsub = onAuthStateChanged(auth, (user) => {
                        setCurrentUser(() => user);
                        setLoading(() => false);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return (() => {
            unsub();
            setCurrentUser(() => null);
            setLoading(() => true);
            componentMounted = false;
        });

    }, []);
    return [currentUser, loading, setCurrentUser];
};

export const useTrackLikes = (projectID, currentUser) => {
    const [likesArr, setLikesArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(null);
    const [liked, setLiked] = useState(false);

    const likesRef = ref(firebaseDatabase, `likes/${projectID}`);

    const convertObjToArr = (data) => {
        return Object.keys(data).map((key) => [key, data[key]]);
    }

    useEffect(() => {
        const unsub = onValue(likesRef, (snapshot) => {
            const data = snapshot.val();
            if (data === null) {
                setLikesArr(() => []);
            } else {
                setLikesArr(() => convertObjToArr(data));
            }
            setLoading(() => false);
        });

        return (() => unsub);
    }, []);

    useEffect(() => {
        let noOfLikes = 0;
        if (currentUser !== null) {
            // Check if user has already liked the post
            likesArr.every((like) => {
                const oneUserID = like[0];
                const boolLiked = like[1];

                if (boolLiked) {
                    noOfLikes += 1;
                }

                if (oneUserID === currentUser?.uid) {
                    if (boolLiked) {
                        setLiked(() => true);
                    } else {
                        setLiked(() => false);
                    }
                }
                return true;
            });

        } else {
            likesArr.every((like) => {
                const boolLiked = like[1];

                if (boolLiked) {
                    noOfLikes += 1;
                }
                return true;
            })
        }

        setLikes(() => noOfLikes);

    }, [likesArr, currentUser]);

    return [likesArr, loading, likes, liked];

};

export const useTrackComments = (projectID, currentUser) => {
    const [commentsArr, setCommentsArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const commentsRef = ref(firebaseDatabase, `comments/${projectID}`);

    const convertObjToArr = (data) => {
        let commentList = Object.keys(data).map((key) => ({
            ...data[key],
            commentID: key
        }));
        commentList = commentList.sort((a, b) => b.createdAt - a.createdAt);

        return commentList;
    }

    useEffect(() => {
        const unsub = onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            if (data === null) {
                setCommentsArr(() => []);
            } else {
                setCommentsArr(() => convertObjToArr(data));
            }
            setLoading(() => false);
        });

        return (() => unsub);
    }, []);

    return [commentsArr, loading];

};