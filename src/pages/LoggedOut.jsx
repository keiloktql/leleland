import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const LoggedOut = () => {

    const navigate = useNavigate();
    
    return (
        <MainLayout title="Logged out">
            <div className="l-Logged-out">
                <div className="c-Logged-out">
                    <h1>You are now logged out</h1>
                    <p>Thank you for visiting, see you again!</p>
                    <button type="button" className="c-Btn c-Btn__Primary" onClick={() => navigate("/login")}>Login again</button>
                    <NavLink to="/">Go to Home</NavLink>
                </div>

            </div>
        </MainLayout>
    );
}

export default LoggedOut;