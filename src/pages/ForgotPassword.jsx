import React, { useState, useEffect } from 'react';
import MinimalistLayout from '../layout/MinimalistLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import LogoDark from '../assets/images/Logo-dark.png';
import { firebaseFn } from '../utils/firebase';
import { toast } from 'react-toastify';


const ForgotPassword = () => {

  const [smh, setSmh] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);
  const [submitError, setSubmitError] = useState(null);
  const [timerVal, setTimeVal] = useState(0);

  useEffect(() => {
    const timerEndMS = localStorage.getItem("fgp_sz");
    const delta = timerEndMS - Date.now(); // milliseconds elapsed since start
    const timeLeft = Math.floor(delta / 1000); // in seconds
    
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        const timerEndMS = localStorage.getItem("fgp_sz");
        const delta = timerEndMS - Date.now(); // milliseconds elapsed since start
        const timeLeft = Math.floor(delta / 1000); // in seconds
        if (timeLeft <= 0) {
          clearInterval(timer);
        }
        setTimeVal(() => timeLeft);
      }, 1000);
    }

  }, [submitStatus]);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });

  const handleLoginSubmit = async (values) => {
    console.log(values);

    setSubmitStatus(() => ENUMS.submitStatus.LOADING);

    const [sendEmailSuccess, sendEmailError] = await firebaseFn.forgotPassword(values.email);

    if (sendEmailSuccess) {
      localStorage.setItem("fgp_sz", Date.now() + 33000);
      setSubmitError(() => null);
      setSubmitStatus(() => ENUMS.submitStatus.SUCCESS);
      toast.success("An email has been sent to your inbox!");
    } else {
      setSubmitStatus(() => ENUMS.submitStatus.ERROR);
      setSubmitError(() => sendEmailError);
      setSmh(() => true);
    }

  };

  return (
    <MinimalistLayout title="Forgot Password • LeLeLand">
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
                  <Field disabled={timerVal > 0 || submitStatus === ENUMS.submitStatus.LOADING} label="Email" placeholder="Enter recovery email" name="email" type="email" as={TextField} />
                  <button disabled={timerVal > 0 || !dirty || !isValid || submitStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                    {
                      timerVal > 0 ?
                        timerVal :
                        submitStatus === ENUMS.submitStatus.LOADING ?
                          <LoadingSpinner
                            variant="light" />
                          :
                          "Send Recovery Email"
                    }

                  </button>
                  {
                  submitStatus === ENUMS.submitStatus.ERROR && (
                    <div className="c-Forgot-password__Card-generic-error">
                      <p>{submitError}</p>
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
          <p>Copyright &#169; 2022 Tham Kei Lok. All rights reserved.</p>
        </div>
      </div>
    </MinimalistLayout>

  );
};

export default ForgotPassword;
