import React from 'react';
import MainLayout from '../layout/MainLayout';
import { firebaseFn } from '../utils/firebase';
import { toast } from 'react-toastify';

const MyAccount = () => {

    const handleLogout = async () => {
        try {
            await firebaseFn.logout();
        } catch (error) {
            toast.error("There was an error");
            console.log(error);
        }
    };

    return (
        <MainLayout title="My Account">
            <div className = "c-My-account">

                <button type = "button" className = "c-Btn c-Btn__Primary" onClick = {handleLogout}>Log out</button>
            </div>
        </MainLayout>
    );
};

export default MyAccount;