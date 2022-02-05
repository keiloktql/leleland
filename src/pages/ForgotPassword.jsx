import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {

  const [recoveryEmail, setRecoveryEmail] = useState("");

  // Handlers
  const handleInputChange = (event) => {
    setRecoveryEmail((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <MainLayout title="Forgot Password">
      <div className="c-Forgot-password">
        <div className="c-Forgot-password__Card">
          <div className="c-Forgot-password__Card-wrapper">
            <p>Enter the email associated to your account and we will send a password reset link to your email.</p>
            <TextField label="Email" placeholder="Enter recovery email" name="email" type="email" value={recoveryEmail} handleInput={handleInputChange} />

            <button type="button" className="c-Btn c-Btn__Primary">Send Recovery Email</button>
            <div className="c-Forgot-password__Login">
              <p>Already have an account?</p>
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>

  );
};

export default ForgotPassword;
