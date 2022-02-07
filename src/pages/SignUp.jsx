import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {

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

  const handleLoginSubmit = (values) => {
    console.log(values);

  };

  return (
    <MainLayout title="Sign up">
      <div className="c-Sign-up">
        <div className="c-Sign-up__Card">
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
                <Form className="c-Sign-up__Card-wrapper">
                  <h1>Sign Up</h1>
                  <Field label="Email" placeholder="Enter email" name="email" type="email" as={TextField} />
                  <Field label="Username" placeholder="Enter username" name="username" as={TextField} />
                  <Field label="Password" placeholder="Enter password" type="password" name="password" as={TextField} />
                  <Field label="Confirm Password" placeholder="Enter password again" type="password" name="confirmPassword" as={TextField}/>

                  <button disabled={!dirty || !isValid} type="submit" className="c-Btn c-Btn__Primary">Sign Up</button>
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