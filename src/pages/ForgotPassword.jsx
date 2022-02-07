import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import TextField from '../components/TextField';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {

  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });

  const handleLoginSubmit = (values) => {
    console.log(values);

  };

  return (
    <MainLayout title="Forgot Password">
      <div className="c-Forgot-password">
        <div className="c-Forgot-password__Card">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validate}
            onSubmit={handleLoginSubmit}
          >
            {
              ({ isValid, dirty }) => (
                <Form className="c-Forgot-password__Card-wrapper">
                  <p>Enter the email associated to your account and we will send a password reset link to your email.</p>
                  <TextField label="Email" placeholder="Enter recovery email" name="email" type="email" />

                  <button disabled={!dirty || !isValid} type="submit" className="c-Btn c-Btn__Primary">Send Recovery Email</button>
                  <div className="c-Forgot-password__Login">
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

export default ForgotPassword;
