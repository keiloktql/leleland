import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { NavLink, useNavigate } from 'react-router-dom';

const Unauthorised = () => {

    const navigate = useNavigate();

    return (
        <MainLayout title="Unauthorised access">
            <div className="l-Unauthorised">
                <div className="c-Unauthorised">
                    <h1>401</h1>
                    <p>Sorry, your request could not be processed</p>
                    <button type="button" className="c-Btn c-Btn__Primary" onClick = {() => navigate("/login")}>Login to LeLeLand</button>
                    <NavLink to="/">Go to Home</NavLink>
                </div>
            </div>
        </MainLayout>
    );
};

export default Unauthorised;