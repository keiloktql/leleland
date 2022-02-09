import React, { useState } from 'react';
import MinimalistLayout from '../layout/MinimalistLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import LogoDark from '../assets/images/Logo-dark.png';

const ForgotPassword = () => {

  const [smh, setSmh] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });

  const handleLoginSubmit = (values) => {
    console.log(values);

    setSubmitStatus(() => ENUMS.submitStatus.LOADING);


    setSubmitStatus(() => ENUMS.submitStatus.ERROR);


    // Error handling
    setSmh(() => true);
  };

  return (
    <MinimalistLayout title="Forgot Password">
      <div className="c-Forgot-password">
        <div className={`c-Forgot-password__Card ${smh ? "c-Login__Card--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validate}
            onSubmit={handleLoginSubmit}
          >
            {
              ({ isValid, dirty }) => (
                <Form className="c-Forgot-password__Card-wrapper" autoComplete="off">
                  <NavLink to="/" className="c-Forgot-password__Card-img">
                    <img src={LogoDark} alt="Logo" />
                  </NavLink>
                  <p>Enter the email associated to your account and we will send a password reset link to your email.</p>
                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Email" placeholder="Enter recovery email" name="email" type="email" as={TextField} />
                  <button disabled={!dirty || !isValid || submitStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                    {
                      submitStatus === ENUMS.submitStatus.LOADING ?
                        <LoadingSpinner
                          variant="light" />
                        :
                        "Send Recovery Email"
                    }

                  </button>
                  {submitStatus === ENUMS.submitStatus.ERROR && (
                    <div className="c-Forgot-password__Card-generic-error">
                      <p>Incorrect username or password.</p>
                    </div>
                  )}
                  <div className="c-Forgot-password__Login">
                    <p>Already have an account?</p>
                    <NavLink to="/login">Login</NavLink>
                  </div>
                </Form>
              )
            }
          </Formik>

        </div>

        <div className="c-Forgot-password__Footer c-Footer">
          <p>Copyright &#169; 2022 LeLe. All rights reserved.</p>
        </div>
      </div>
    </MinimalistLayout>

  );
};

export default ForgotPassword;
