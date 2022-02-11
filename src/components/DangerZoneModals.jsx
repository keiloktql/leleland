import React, { useEffect, useState } from 'react';
import LoadingSpinner from './loading/LoadingSpinner';
import ENUMS from '../config/enums';
import { firebaseFn } from '../utils/firebase';
import { toast } from 'react-toastify';

const DangerZoneModals = ({ show, handleClose, type }) => {

    const [inputs, setInputs] = useState(null);
    const [inputsError, setInputsError] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(ENUMS.submitStatus.IDLE);

    useEffect(() => {
        let componentMounted = true;

        (async () => {
            try {
                let inputObj = {};
                let inputErrObj = {};
                if (type === ENUMS.dangerZoneType.CHANGE_PASSWORD) {
                    inputObj = {
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    };

                    inputErrObj = {
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    };
                } else {
                    inputObj = {
                        password: ""
                    }
                    inputErrObj = {
                        password: ""
                    }
                }
                if (componentMounted) {
                    setInputs(() => inputObj);
                    setInputsError(() => inputErrObj);
                    setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
                }

            } catch (error) {
                console.log(error);
            }
        })();

        return (() => {
            componentMounted = false;
        })
    }, [show]);

    const showHideClassName = show ? "l-Danger-zone-modals l-Danger-zone-modals--show" : "l-Danger-zone-modals l-Danger-zone-modals--hidden";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmissionStatus(() => ENUMS.submitStatus.LOADING);

        if (type === ENUMS.dangerZoneType.DELETE_ACCOUNT) {
            const [deleteSuccess, deleteError] = await firebaseFn.deleteAccount(inputs.password);
            if (deleteSuccess) {
                setTimeout(() => {
                    toast.success("Account has been deleted successfully!");
                }, 0);
                handleClose();
            } else {
                toast.error(deleteError);
                setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
            }
        }

        if (type === ENUMS.dangerZoneType.CHANGE_PASSWORD) {
            const [changePasswordSuccess, changePasswordError] = await firebaseFn.changePassword(inputs.currentPassword, inputs.newPassword);
            if (changePasswordSuccess) {
                setTimeout(() => {
                    toast.success("Account has been deleted successfully!");
                }, 0);
                handleClose();
            } else {
                toast.error(changePasswordError);
                setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
            }
        }
    };

    const handleInputChange = (event) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <form className={showHideClassName} onSubmit={(event) => handleSubmit(event)}>
            {
                type === ENUMS.dangerZoneType.DELETE_ACCOUNT ?
                    <div className="c-Danger-zone-modal c-Danger-zone-modal--delete-account">
                        <div className="c-Danger-zone-modal__Top">
                            <h1>Delete account</h1>
                            <p>Enter your current password to continue.</p>
                        </div>
                        <div className="c-Danger-zone-modal__Input c-Input">
                            <label htmlFor="password">Current password</label>
                            <input disabled={submissionStatus === ENUMS.submitStatus.LOADING} name="password" type="password" value={inputs?.password || ""} onChange={(event) => handleInputChange(event)} />
                            {
                                inputsError?.password ?
                                    <p className="c-Input__Error">{inputsError.password}</p> :
                                    null
                            }
                        </div>
                        <div className="c-Danger-zone-modal__Btns">
                            <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                                {
                                    submissionStatus === ENUMS.submitStatus.LOADING ?
                                        <LoadingSpinner variant="light" /> :
                                        "Delete account"
                                }
                            </button>
                            <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="button" className="c-Btn c-Btn__Empty" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                    :
                    <div className="c-Danger-zone-modal c-Danger-zone-modal--change-password">
                        <div className="c-Danger-zone-modal__Top">
                            <h1>Change password</h1>
                            <p>Enter your current password to continue.</p>
                        </div>
                        <div className="c-Danger-zone-modal__Input c-Input">
                            <label htmlFor="password">Current password</label>
                            <input disabled={submissionStatus === ENUMS.submitStatus.LOADING} name="currentPassword" type="password" value={inputs?.currentPassword || ""} onChange={(event) => handleInputChange(event)} />
                            {
                                inputsError?.currentPassword ?
                                    <p className="c-Input__Error">{inputsError.currentPassword}</p> :
                                    null
                            }
                        </div>
                        <div className="c-Danger-zone-modal__Input c-Input">
                            <label htmlFor="password">New password</label>
                            <input disabled={submissionStatus === ENUMS.submitStatus.LOADING} name="newPassword" type="password" value={inputs?.newPassword || ""} onChange={(event) => handleInputChange(event)} />
                            {
                                inputsError?.newPassword ?
                                    <p className="c-Input__Error">{inputsError.newPassword}</p> :
                                    null
                            }
                        </div>
                        <div className="c-Danger-zone-modal__Input c-Input">
                            <label htmlFor="password">Confirm New password</label>
                            <input disabled={submissionStatus === ENUMS.submitStatus.LOADING} name="confirmPassword" type="password" value={inputs?.confirmPassword || ""} onChange={(event) => handleInputChange(event)} />
                            {
                                inputsError?.confirmPassword ?
                                    <p className="c-Input__Error">{inputsError.confirmPassword}</p> :
                                    null
                            }
                        </div>
                        <div className="c-Danger-zone-modal__Btns">
                            <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                                {
                                    submissionStatus === ENUMS.submitStatus.LOADING ?
                                        <LoadingSpinner variant="light" /> :
                                        "Change password"
                                }
                            </button>
                            <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="button" className="c-Btn c-Btn__Empty" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
            }

        </form>
    )
}

export default DangerZoneModals;