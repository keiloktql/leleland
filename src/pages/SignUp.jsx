import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  // Handlers
  const handleInputChange = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <MainLayout title="Sign up">
      <div className="c-Sign-up">
        <div className="c-Sign-up__Card">
          <div className="c-Sign-up__Card-wrapper">
            <h1>Sign Up</h1>
            <TextField label="Email" placeholder="Enter email" name="email" type="email" value={credentials.email} handleInput={handleInputChange} />
            <TextField label="Username" placeholder="Enter username" name="username" value={credentials.username} handleInput={handleInputChange} />
            <TextField label="Password" placeholder="Enter password" type="password" name="password" value={credentials.password} handleInput={handleInputChange} />
            <TextField label="Confirm Password" placeholder="Enter password again" type="password" name="confirmPassword" value={credentials.confirmPassword} handleInput={handleInputChange} />


            <button type="button" className="c-Btn c-Btn__Primary">Sign Up</button>
            <div className="c-Sign-up__Login">
              <p>Already have an account?</p>
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>

  );
};

export default SignUp;