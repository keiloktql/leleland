import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';

const Login = () => {

  const [smh, setSmh] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);

  const validate = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const handleLoginSubmit = (values) => {
    console.log(values);

    setSubmitStatus(() => ENUMS.submitStatus.LOADING);


    setSubmitStatus(() => ENUMS.submitStatus.ERROR);


    // Error handling
    setSmh(() => true);
  };

  return (
    <MainLayout title="Login">
      <div className="c-Login">
        <div className=" c-Login__Blob c-Login__Blob--1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
          </svg>
        </div>
        <div className="c-Login__Blob c-Login__Blob--2">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440.7 428.7">
            <path d="M410.6 78.8c36 52.5 36.1 126 19.2 194C412.9 340.7 379 403 330 421.9c-49 19-113.1-5.3-178.6-34C85.8 359.2 18.7 326.1 3.5 276.4-11.7 226.7 25 160.3 71.7 105.3 118.3 50.3 174.8 6.8 239 .7c64.1-6 135.7 25.5 171.6 78.1z"></path>
          </svg>
        </div>

        <div className={`c-Login__Card ${smh ? "c-Login__Card--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={validate}
            onSubmit={handleLoginSubmit}
          >
            {
              ({ errors, touched, submitCount, isValid, dirty }) => (
                <Form className="c-Login__Card-wrapper" autoComplete="off">
                  <h1>Login</h1>
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Username" placeholder="Enter username" name="username" as={TextField} />
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Password" placeholder="Enter password" type="password" name="password" as={TextField} />
                  <NavLink to="/forgot-password">Forgot Password</NavLink>
                  <button disabled={!dirty || !isValid || submitStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                    {
                      submitStatus === ENUMS.submitStatus.LOADING ?
                        <LoadingSpinner
                          variant="light" />
                        :
                        "Login"
                    }
                  </button>
                  {submitStatus === ENUMS.submitStatus.ERROR && (
                    <div className="c-Login__Card-generic-error">
                      <p>Incorrect username or password.</p>
                    </div>
                  )}
                  <div className="c-Login__Sign-up">
                    <p>Don't have an account?</p>
                    <NavLink to="/sign-up">Sign Up</NavLink>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </MainLayout>

  );
};

export default Login;
