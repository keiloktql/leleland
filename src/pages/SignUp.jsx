import React, { useState, useEffect } from 'react';
import MinimalistLayout from '../layout/MinimalistLayout';
import TextField from '../components/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import { firebaseFn, useAuth } from '../utils/firebase';
import LogoDark from '../assets/images/Logo-dark.png';
import { toast } from 'react-toastify';

const SignUp = () => {

  const navigate = useNavigate();

  const [smh, setSmh] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);
  const [submitError, setSubmitError] = useState(null);
  const [currentUser, loading, setCurrentUser] = useAuth();

  useEffect(() => {
    if (submitStatus === ENUMS.submitStatus.SUCCESS && currentUser !== null) {

    }
  }, []);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    displayName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Display name is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required')
  });

  const handleLoginSubmit = async (values) => {

    setSubmitStatus(() => ENUMS.submitStatus.LOADING);

    const email = values.email;
    const displayName = values.displayName;
    const password = values.password;

    const [signUpSuccess, signUpError] = await firebaseFn.signUp(displayName, email, password, navigate);

    if (signUpSuccess) {
      setTimeout(() => {
        toast.success("Account sign up successful!");
      }, 0);
    } else {
      setSubmitStatus(() => ENUMS.submitStatus.ERROR);
      setSubmitError(() => signUpError);
      // Error handling
      setSmh(() => true);
    }

  };

  return (
    <MinimalistLayout title="Sign Up • LeLeLand">
      <div className="c-Sign-up">
        <div className={`c-Sign-up__Card ${smh ? "c-Login__Card--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
          {
            submitStatus === ENUMS.submitStatus.SUCCESS ?
              <div className="c-Sign-up__Success">
                <span>
                  <svg viewBox="0 0 24 24">
                    <path strokeWidth="3" fill="none" stroke="#ffffff" d="M 3,12 l 6,6 l 12, -12" />
                  </svg>
                </span>
                <h1>Sign up success!</h1>
                <p>You are currently logged in.</p>
                <NavLink to="/">Go to gallery</NavLink>
              </div>
              :
              <Formik
                initialValues={{
                  email: '',
                  displayName: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={validate}
                onSubmit={handleLoginSubmit}
              >
                {
                  ({ isValid, dirty }) => (
                    <Form className="c-Sign-up__Card-wrapper" autoComplete="off">
                      <NavLink to="/" className="c-Sign-up__Card-img">
                        <img src={LogoDark} alt="Logo" />
                      </NavLink>
                      <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Email" placeholder="Enter email" name="email" type="email" as={TextField} />
                      <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Display Name" placeholder="Enter display name" name="displayName" as={TextField} />
                      <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Password" placeholder="Enter password" type="password" name="password" as={TextField} />
                      <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Confirm Password" placeholder="Enter password again" type="password" name="confirmPassword" as={TextField} />
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
                          <p>{submitError ? submitError : "Something went wrong!"}</p>
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
          }



        </div>

        <div className="c-Sign-up__Footer c-Footer">
          <p>Copyright &#169; 2022 Tham Kei Lok. All rights reserved.</p>
        </div>
      </div>
    </MinimalistLayout>

  );
};

export default SignUp;