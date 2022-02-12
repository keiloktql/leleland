import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { firebaseFn, useAuth } from '../utils/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import ENUMS from '../config/enums';
import InputModals from '../components/InputModals';

const MyAccount = () => {

    const navigate = useNavigate();
    const [currentUser, loading, setCurrentUser] = useAuth();

    const [displayName, setDisplayName] = useState("");
    const [rerender, setRerender] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const [inputModalType, setInputModalType] = useState(null);

    useEffect(() => {
        setDisplayName(() => currentUser?.displayName);

    }, [currentUser, rerender]);

    const handleLogout = async () => {
        try {
            await firebaseFn.logout(navigate);
        } catch (error) {
            toast.error("There was an error");
            console.log(error);
        }
    };

    const handleShowInputModal = (type) => {
        setInputModalType(() => type);
        setShowInputModal(() => true);
    };

    const handleInputModal = () => {
        setShowInputModal(() => false);
    };

    return (
        <>
            {
                showInputModal ?
                    <InputModals show={showInputModal} handleClose={handleInputModal} type={inputModalType} setRerender={setRerender} /> :
                    null
            }
            <MainLayout title="My Account">
                <div className="l-My-account">
                    <div className="c-My-account">
                        <h1>My Account</h1>
                        <div className="l-My-account__Profile l-Profile">
                            <div className="c-Profile">
                                <div className="c-Profile__Top c-Top">
                                    <div className="c-Top__Avatar">
                                        {
                                            currentUser?.photoURL ?
                                                <img className="c-Avatar" src={currentUser.photoURL} alt="Avatar" /> :
                                                <span className="c-Avatar"></span>
                                        }

                                        <div className="c-Top__Name">
                                            {
                                                loading ?
                                                    <Skeleton variant="text" width={100} /> :
                                                    <h2>{displayName ? displayName : "Error"}</h2>
                                            }
                                        </div>

                                    </div>
                                    <div className="c-Top__Btn">
                                        <button disabled={loading} type="button" className="c-Btn c-Btn__Primary" onClick={handleLogout}>Log out</button>
                                    </div>
                                </div>
                                <div className="l-Profile__Details l-Details">
                                    <div className="c-Details">
                                        <div className="c-Details__Row c-Row">
                                            <div className="c-Row__Info">
                                                <label htmlFor="email">Email</label>
                                                {
                                                    loading ?
                                                        <Skeleton variant="text" width={120} /> :
                                                        <p>{currentUser?.email ? currentUser.email : "Error"}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="c-Details__Row c-Row">
                                            <div className="c-Row__Info">
                                                <label htmlFor="displayName">Display Name</label>

                                                {
                                                    loading ?
                                                        <Skeleton variant="text" width={80} /> :
                                                        <p>{currentUser?.displayName ? currentUser.displayName : "Error"}</p>
                                                }
                                            </div>
                                            <div className="c-Row__Btn">
                                                <button disabled={loading} type="button" className="c-Btn c-Btn__Primary" onClick={() => handleShowInputModal(ENUMS.inputModalType.CHANGE_DISPLAY_NAME)}>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="c-My-account__Danger-zone c-Danger-zone">
                            <div className="c-My-account__Heading c-Heading">
                                <div className="c-Heading__Text">
                                    <h1>Danger Zone</h1>
                                </div>
                            </div>
                            <div className="c-Danger-zone__Details">
                                <div className="c-Danger-zone__Row c-Row">
                                    <button disabled={loading} type="button" className="c-Btn c-Btn__Danger" onClick={() => handleShowInputModal(ENUMS.inputModalType.CHANGE_PASSWORD)}>Change password</button>
                                    <div className="c-Row__Info">
                                        <h3>Change password</h3>
                                        <p>Performing this action will log out all other signed in devices.</p>
                                    </div>
                                </div>
                                <div className="c-Danger-zone__Row c-Row">
                                    <button disabled={loading} type="button" className="c-Btn c-Btn__Danger" onClick={() => handleShowInputModal(ENUMS.inputModalType.DELETE_ACCOUNT)}>Delete account</button>
                                    <div className="c-Row__Info">
                                        <h3>Delete this account</h3>
                                        <p>Information associated to this account will not be deleted e.g. likes, comments.</p>
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