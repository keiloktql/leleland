import React from 'react';
import MainLayout from '../layout/MainLayout';
import { firebaseFn } from '../utils/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await firebaseFn.logout();
            navigate("/logged-out");
        } catch (error) {
            toast.error("There was an error");
            console.log(error);
        }
    };

    return (
        <MainLayout title="My Account">
            <div className="l-My-account">
                <div className="c-My-account">
                    <div className="c-My-account__Profile  c-Profile">
                        <div className="c-My-account__Heading c-Heading">
                            <div className="c-Heading__Text">
                                <h1>Account Details</h1>
                                <p>Hello, Le Le</p>
                            </div>
                            <div className="c-Heading__Btn">
                                <button type="button" className="c-Btn c-Btn__Primary" onClick={handleLogout}>Log out</button>
                            </div>
                        </div>
                        <hr />
                        <div className="c-Profile__Details">
                            <div className="c-Profile__Labels">
                                <label htmlFor="email">Email</label>
                                <label htmlFor="displayName">Display Name</label>
                            </div>
                            <div className="c-Profile__Info">
                                <p>placeholder email</p>
                                <p>placeholder display name</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </MainLayout>
    );
};

export default MyAccount;