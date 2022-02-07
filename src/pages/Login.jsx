import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';

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
                <Form className="c-Login__Card-wrapper">
                  <h1>Login</h1>
                  <Field label="Username" placeholder="Enter username" name="username" as={TextField} />
                  <Field label="Password" placeholder="Enter password" type="password" name="password" as={TextField} />
                  <NavLink to="/forgot-password">Forgot Password</NavLink>
                  <button disabled={!dirty || !isValid} type="submit" className="c-Btn c-Btn__Primary">Login</button>
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
