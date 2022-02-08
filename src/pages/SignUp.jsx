import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import { firebaseFn } from '../utils/firebase';

const SignUp = () => {
  const [smh, setSmh] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    username: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required')
  });

  const handleLoginSubmit = async (values) => {
    console.log(values);

    setSubmitStatus(() => ENUMS.submitStatus.LOADING);

    const email = values.email;
    const username = values.username;
    const password = values.password;

    const returnVal = await firebaseFn.signUp(username, email, password);
    console.log(returnVal);

    setSubmitStatus(() => ENUMS.submitStatus.ERROR);


    // Error handling
    setSmh(() => true);

  };

  return (
    <MainLayout title="Sign up">
      <div className="c-Sign-up">
        <div className={`c-Sign-up__Card ${smh ? "c-Login__Card--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validate}
            onSubmit={handleLoginSubmit}
          >
            {
              ({isValid, dirty}) => (
                <Form className="c-Sign-up__Card-wrapper" autoComplete="off">
                  <h1>Sign Up</h1>
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Email" placeholder="Enter email" name="email" type="email" as={TextField} />
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Username" placeholder="Enter username" name="username" as={TextField} />
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Password" placeholder="Enter password" type="password" name="password" as={TextField} />
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Confirm Password" placeholder="Enter password again" type="password" name="confirmPassword" as={TextField}/>

                  <button disabled={!dirty || !isValid || submitStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                  {
                      submitStatus === ENUMS.submitStatus.LOADING ?
                        <LoadingSpinner
                          variant="light" />
                        :
                        "Sign Up"
                    }
                  </button>
                  {submitStatus === ENUMS.submitStatus.ERROR && (
                    <div className="c-Sign-up__Card-generic-error">
                      <p>Incorrect fields detected.</p>
                    </div>
                  )}
                  <div className="c-Sign-up__Login">
                    <p>Already have an account?</p>
                    <NavLink to="/login">Login</NavLink>
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

export default SignUp;