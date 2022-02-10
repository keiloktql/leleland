import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';

const LoggedInError = () => {
    return (
        <MainLayout title="Error">
            <div className="c-Logged-in-error">
                <h1>Error</h1>
                <p>Logged-in use not supported</p>
                <NavLink to="/">Go to Home</NavLink>
            </div>
        </MainLayout>
    )
}

export default LoggedInError