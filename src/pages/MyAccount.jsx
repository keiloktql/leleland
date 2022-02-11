import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { firebaseFn, useAuth } from '../utils/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import DangerZoneModals from '../components/DangerZoneModals';

const MyAccount = () => {

    const navigate = useNavigate();
    const [currentUser, loading, setCurrentUser] = useAuth();

    const [displayName, setDisplayName] = useState("");
    const [displayNameError, setDisplayNameError] = useState(null);
    const [displayNameSubmissionStatus, setDisplayNameSubmissionStatus] = useState(ENUMS.submitStatus.IDLE);
    const [rerender, setRerender] = useState(false);
    const [showDangerZoneModal, setShowDangerZoneModal] = useState(false);
    const [dangerZoneModalType, setDangerZoneModalType] = useState(null);

    useEffect(() => {
        setDisplayName(() => currentUser?.displayName);

    }, [currentUser, rerender]);

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
            if (displayNameError !== null) {
                setDisplayNameError(() => null);
            }
        }
    };

    const handleChangeDisplayName = async () => {

        if (displayName === "" || displayName === null || displayName === undefined) {
            toast.error("Display Name cannot be empty");
            return;
        }

        if (currentUser?.displayName === displayName) {
            toast.error("Display Name is the same. No changes made.");
            return;
        }

        setDisplayNameSubmissionStatus(() => ENUMS.submitStatus.LOADING);

        const [updateDisplayNameSuccess, updateDisplayNameError] = await firebaseFn.updateUserProfile(displayName);

        if (updateDisplayNameSuccess) {
            setCurrentUser(() => firebaseFn.getCurrentUser());
            setRerender((prevState) => !prevState);
            toast.success("Display name has been successfully changed!");
        } else {
            toast.error(updateDisplayNameError);
        }

        setDisplayNameSubmissionStatus(() => ENUMS.submitStatus.IDLE);

    };

    const handleShowDangerZoneModal = (type) => {
        setDangerZoneModalType(() => type);
        setShowDangerZoneModal(() => true);
    };

    const handleHideDangerZoneModal = () => {
        setShowDangerZoneModal(() => false);
    };

    return (
        <>
        <DangerZoneModals show={showDangerZoneModal} handleClose={handleHideDangerZoneModal} type={dangerZoneModalType} />
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
                                                    <input type="text" onChange={(event) => handleInputChange(event)} value={displayName} disabled={displayNameSubmissionStatus === ENUMS.submitStatus.LOADING} />
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
                                <button type="button" disabled={displayName === "" || currentUser?.displayName === displayName || displayNameSubmissionStatus === ENUMS.submitStatus.LOADING} className="c-Btn c-Btn__Primary" onClick={() => handleChangeDisplayName()}>
                                    {
                                        displayNameSubmissionStatus === ENUMS.submitStatus.LOADING ?
                                        <LoadingSpinner variant="light"/> :
                                        "Update Profile"
                                    }
                                </button>
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
                            <div className = "c-Danger-zone__Row c-Row">
                                <button type = "button" className = "c-Btn c-Btn__Danger" onClick = {() => handleShowDangerZoneModal(ENUMS.dangerZoneType.CHANGE_PASSWORD)}>Change password</button>
                                <div className="c-Row__Info">
                                    <h3>Change password</h3>
                                    <p>Performing this action will log out all other signed in devices.</p>
                                </div>
                            </div>
                            <div className="c-Danger-zone__Row c-Row">
                                <button type="button" className="c-Btn c-Btn__Danger" onClick={() => handleShowDangerZoneModal(ENUMS.dangerZoneType.DELETE_ACCOUNT)}>Delete account</button>
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
        </>

    );
};

export default MyAccount;