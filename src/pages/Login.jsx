import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Handlers
  const handleInputChange = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };


  return (
    <MainLayout title="Login">
      <div className="c-Login">
        <div className="c-Login__Card">
          <div className="c-Login__Card-wrapper">
            <h1>Login</h1>
            <TextField label="Username" placeholder="Enter username" name="username" value={credentials.username} handleInput={handleInputChange} />
            <TextField label="Password" placeholder="Enter password" type="password" name="password" value={credentials.password} handleInput={handleInputChange} />
            <NavLink to="/forgot-password">Forgot Password</NavLink>

            <button type="button" className="c-Btn c-Btn__Primary">Login</button>
            <div className="c-Login__Sign-up">
              <p>Don't have an account?</p>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>

  );
};

export default Login;
