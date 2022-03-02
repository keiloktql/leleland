import React, { useEffect, useState } from 'react';
import LoadingSpinner from './loading/LoadingSpinner';
import ENUMS from '../config/enums';
import { firebaseFn } from '../utils/firebase';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';

const InputModals = ({ show, handleClose, type, setRerender }) => {

    const [submissionStatus, setSubmissionStatus] = useState(ENUMS.submitStatus.IDLE);
    const [smh, setSmh] = useState(false);
    const [validateObj, setValidateObj] = useState({});
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let componentMounted = true;

        (async () => {
            try {
                let initialValueObj = {};
                let tempValidateObj = {};
                if (type === ENUMS.inputModalType.CHANGE_PASSWORD) {
                    initialValueObj = {
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    };
                    tempValidateObj = Yup.object({
                        currentPassword: Yup.string().required('Current password is required'),
                        newPassword: Yup.string()
                            .min(8, 'Password must be at least 8 characters')
                            .required('Password is required')
                            .matches(/[a-z]+/, "Missing lowercase character(s)")
                            .matches(/[A-Z]+/, "Missing uppercase character(s)")
                            .matches(/[@$!%*#?&]+/, "Missing special character(s)")
                            .matches(/\d+/, "Missing number(s)"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], 'Password must match')
                            .required('Confirm password is required')
                    });
                }
                if (type === ENUMS.inputModalType.DELETE_ACCOUNT) {
                    initialValueObj = {
                        currentPassword: ""
                    };

                    tempValidateObj = Yup.object({
                        currentPassword: Yup.string().required('Current password is required'),
                    });
                }
                if (type === ENUMS.inputModalType.CHANGE_DISPLAY_NAME) {
                    initialValueObj = {
                        displayName: ""
                    };

                    tempValidateObj = Yup.object({
                        displayName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Display name is required'),
                    });
                }

                if (componentMounted) {
                    setValidateObj(() => tempValidateObj);
                    setInitialValues(() => initialValueObj);
                    setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
                    setLoading(() => false);
                }

            } catch (error) {
                console.log(error);
            }
        })();

        return (() => {
            componentMounted = false;
        })
    }, [show]);

    const showHideClassName = show ? "l-Input-modals l-Input-modals--show" : "l-Input-modals l-Input-modals--hidden";

    const handleSubmit = async (values) => {
        setSubmissionStatus(() => ENUMS.submitStatus.LOADING);

        // Handle delete account
        if (type === ENUMS.inputModalType.DELETE_ACCOUNT) {
            const [deleteSuccess, deleteError] = await firebaseFn.deleteAccount(values.currentPassword);
            if (deleteSuccess) {
                setTimeout(() => {
                    toast.success("Account has been deleted successfully!");
                }, 0);
                handleClose();
            } else {
                toast.error(deleteError);
                setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
                setSmh(() => true);
            }
        }

        // Handle change password
        if (type === ENUMS.inputModalType.CHANGE_PASSWORD) {

            const [changePasswordSuccess, changePasswordError] = await firebaseFn.changePassword(values.currentPassword, values.newPassword);
            if (changePasswordSuccess) {
                setTimeout(() => {
                    toast.success("Password has been changed successfully!");
                }, 0);
                handleClose();
            } else {
                toast.error(changePasswordError);
                setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
                setSmh(() => true);
            }
        }

        // Handle change display name
        if (type === ENUMS.inputModalType.CHANGE_DISPLAY_NAME) {
            const [updateDisplayNameSuccess, updateDisplayNameError] = await firebaseFn.updateUserDisplayName(values.displayName);

            if (updateDisplayNameSuccess) {
                setTimeout(() => {
                    toast.success("Display name has been changed successfully!");
                }, 0);
                handleClose();
                setRerender();
            } else {
                toast.error(updateDisplayNameError);
                setSubmissionStatus(() => ENUMS.submitStatus.IDLE);
                setSmh(() => true);
            }

        }
    };


    const renderInputSection = (isValid, dirty) => {
        if (type === ENUMS.inputModalType.DELETE_ACCOUNT) {
            return (
                <div className={`c-Input-modals c-Input-modals--delete-account ${smh ? "c-Input-modals--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
                    <div className="c-Input-modals__Top">
                        <h1>Delete account</h1>
                        <p>Enter your current password to continue.</p>
                    </div>
                    <div className="c-Input-modals__Input c-Input">
                        <Field disabled={submissionStatus === ENUMS.submitStatus.LOADING} label="Current password" placeholder="Enter current password" type="password" name="currentPassword" as={TextField} />
                    </div>
                    <div className="c-Input-modals__Btns">
                        <button disabled={!dirty || !isValid || submissionStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Danger">
                            {
                                submissionStatus === ENUMS.submitStatus.LOADING ?
                                    <LoadingSpinner variant="light" /> :
                                    "Delete account"
                            }
                        </button>
                        <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="button" className="c-Btn c-Btn__Empty" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            );
        }

        if (type === ENUMS.inputModalType.CHANGE_PASSWORD) {
            return (
                <div className={`c-Input-modals c-Input-modals--change-password ${smh ? "c-Input-modals--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
                    <div className="c-Input-modals__Top">
                        <h1>Change password</h1>
                        <p>Enter your current password to continue.</p>
                    </div>
                    <div className="c-Input-modals__Input c-Input">
                        <Field disabled={submissionStatus === ENUMS.submitStatus.LOADING} label="Current password" placeholder="Enter current password" type="password" name="currentPassword" as={TextField} />
                    </div>
                    <div className="c-Input-modals__Input c-Input">
                        <Field disabled={submissionStatus === ENUMS.submitStatus.LOADING} label="New password" placeholder="Enter new password" type="password" name="newPassword" as={TextField} />
                    </div>
                    <div className="c-Input-modals__Input c-Input">
                        <Field disabled={submissionStatus === ENUMS.submitStatus.LOADING} label="Confirm new password" placeholder="Enter new password again" type="password" name="confirmPassword" as={TextField} />
                    </div>
                    <div className="c-Input-modals__Btns">
                        <button disabled={!dirty || !isValid || submissionStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Danger">
                            {
                                submissionStatus === ENUMS.submitStatus.LOADING ?
                                    <LoadingSpinner variant="light" /> :
                                    "Change password"
                            }
                        </button>
                        <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="button" className="c-Btn c-Btn__Empty" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            );
        }

        if (type === ENUMS.inputModalType.CHANGE_DISPLAY_NAME) {
            return (
                <div className={`c-Input-modals c-Input-modals--change-display-name ${smh ? "c-Input-modals--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
                    <div className="c-Input-modals__Top">
                        <h1>Change Display Name</h1>
                        <p>Enter your current password to continue.</p>
                    </div>
                    <div className="c-Input-modals__Input c-Input">
                        <Field disabled={submissionStatus === ENUMS.submitStatus.LOADING} label="New display name" placeholder="Enter new display name" name="displayName" as={TextField} />
                    </div>
                    <div className="c-Input-modals__Btns">
                        <button disabled={!dirty || !isValid || submissionStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                            {
                                submissionStatus === ENUMS.submitStatus.LOADING ?
                                    <LoadingSpinner variant="light" /> :
                                    "Change display name"
                            }
                        </button>
                        <button disabled={submissionStatus === ENUMS.submitStatus.LOADING} type="button" className="c-Btn c-Btn__Empty" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            );
        }

        return <p>Something went wrong.</p>
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues || {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
                displayName: ""
            }}
            validationSchema={validateObj}
            onSubmit={handleSubmit}
        >
            {
                ({ isValid, dirty }) => (
                    <Form className={showHideClassName}>
                        {loading ? null : renderInputSection(isValid, dirty)}
                    </Form>
                )
            }

        </Formik>

    )
}

export default InputModals;