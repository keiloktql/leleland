import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';

const GenericError = () => {
  return (
    <MainLayout title="Unknown error • LeLeLand">
    <div className="c-Generic-error">
      <h1>Something went wrong</h1>
      <p>An unknown error has occured. Try again later</p>
      <NavLink to="/">Go to Home</NavLink>
    </div>
  </MainLayout>
  )
}

export default GenericError;