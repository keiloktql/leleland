import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { firebaseFn, useAuth } from '../utils/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

const MyAccount = () => {

    const navigate = useNavigate();
    const [currentUser, loading, setCurrentUser] = useAuth();

    const [displayName, setDisplayName] = useState("");
    const [displayNameError, setDisplayNameError] = useState(null);

    useEffect(() => {
        setDisplayName(() => currentUser?.displayName);

    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await firebaseFn.logout();
            navigate("/logged-out");
        } catch (error) {
            toast.error("There was an error");
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        setDisplayName(() => event.target.value);

        if (event.target.value === "") {
            setDisplayNameError(() => "Display name cannot be empty!");
        } else {
            if (displayName !== null) {
                setDisplayNameError(() => null);
            }
        }
    };

    const handleChangeDisplayName = () => {

        if (displayName === "" || displayName === null || displayName === undefined) {
            toast.error("Display Name cannot be empty");
            return;
        }

        if (currentUser?.displayName === displayName) {
            toast.error("Display Name is the same. No changes made.");
            return;
        }

        setCurrentUser(() => firebaseFn.getCurrentUser());
    };

    const handleDeleteAccount = async () => {
        console.log("clickded on delte account");
    };
    console.log(displayName === null)
    console.log(displayName === "")

    return (
        <MainLayout title="My Account">
            <div className="l-My-account">
                <div className="c-My-account">
                    <div className="c-My-account__Profile  c-Profile">
                        <div className="c-My-account__Heading c-Heading">
                            <div className="c-Heading__Text">
                                <h1>Account Details</h1>
                                {
                                    loading ?
                                        <Skeleton variant="text" width={100} /> :
                                        <p>{currentUser?.displayName ? `Hello, ${currentUser.displayName}` : "Error"}</p>
                                }
                            </div>
                            <div className="c-Heading__Btn">
                                <button disabled={loading} type="button" className="c-Btn c-Btn__Primary" onClick={handleLogout}>Log out</button>
                            </div>
                        </div>
                        <hr />
                        <div className="c-Profile__Details">
                            <div className="c-Profile__Details-row c-Row">
                                <label htmlFor="email">Email</label>
                                <div className="c-Row__Info">
                                    {
                                        loading ?
                                            <Skeleton variant="text" width={80} /> :
                                            <p>{currentUser?.email ? currentUser.email : "Error"}</p>
                                    }
                                </div>
                            </div>
                            <div className="c-Profile__Details-row c-Row">
                                <label htmlFor="displayName">Display Name</label>
                                <div className="c-Row__Info">
                                    {
                                        loading ?
                                            <Skeleton variant="text" width={120} /> :
                                            displayName || displayName === "" ?
                                                <div className="c-Row__Textfield">
                                                    <input type="text" onChange={(event) => handleInputChange(event)} value={displayName} />
                                                    {
                                                        displayNameError ?
                                                            <p className="c-Row__Error-message">{displayNameError}</p> :
                                                            null
                                                    }

                                                </div>
                                                :
                                                <p>Error</p>
                                    }
                                </div>
                            </div>
                            <div className="c-Profile__Details-btn">
                                <button type="button" disabled={displayName === "" || currentUser?.displayName === displayName} className="c-Btn c-Btn__Primary" onClick={() => handleChangeDisplayName()}>Update profile</button>
                            </div>
                        </div>
                    </div>
                    <div className="c-My-account__Danger-zone c-Danger-zone">
                        <div className="c-My-account__Heading c-Heading">
                            <div className="c-Heading__Text">
                                <h1>Danger Zone</h1>
                            </div>
                        </div>
                        <hr />
                        <div className="c-Danger-zone__Details">
                            <div className="c-Danger-zone__Row c-Row">
                                <button type="button" className="c-Btn c-Btn__Danger" onClick={() => handleDeleteAccount()}>Delete account</button>
                                <div className="c-Row__Info">
                                    <h3>Delete this account</h3>
                                    <p>All information associated to your account will be permanently deleted.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </MainLayout>
    );
};

export default MyAccount;