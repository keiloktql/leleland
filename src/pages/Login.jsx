import React, { useState } from 'react';
import MinimalistLayout from '../layout/MinimalistLayout';
import TextField from '../components/TextField';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import LogoDark from '../assets/images/Logo-dark.png';
import { firebaseFn } from '../utils/firebase';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const [smh, setSmh] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);
  const [submitError, setSubmitError] = useState(null);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleLoginSubmit = async (values) => {

    setSubmitStatus(() => ENUMS.submitStatus.LOADING);
    const email = values.email;
    const password = values.password;

    const [loginSuccess, loginError] = await firebaseFn.login(email, password);

    if (loginSuccess) {
      navigate("/home");
      setTimeout(() => {
        toast.success("You have successfully logged in!");
      }, 0);
      return;
    }

    setSubmitStatus(() => ENUMS.submitStatus.ERROR);
    setSubmitError(() => loginError);
    setSmh(() => true);
  };

  return (
    <MinimalistLayout title="Login">
      <div className="c-Login">

        <div className={`c-Login__Card ${smh ? "c-Login__Card--smh" : null}`} onAnimationEnd={() => setSmh(() => false)}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validate}
            onSubmit={handleLoginSubmit}
          >
            {
              ({ errors, touched, submitCount, isValid, dirty }) => (
                <Form className="c-Login__Card-wrapper" autoComplete="off">
                  <NavLink to="/" className="c-Login__Card-img">
                    <img src={LogoDark} alt="Logo" />
                  </NavLink>

                  <Field disabled={submitStatus === ENUMS.submitStatus.LOADING} label="Email" placeholder="Enter email" name="email" as={TextField} />
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
                      <p>{submitError ? submitError : "Something went wrong."}</p>
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

        <div className="c-Login__Footer c-Footer">
          <p>Copyright &#169; 2022 LeLe. All rights reserved.</p>
        </div>
      </div>
    </MinimalistLayout>

  );
};

export default Login;
