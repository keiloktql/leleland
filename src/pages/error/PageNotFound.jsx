import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';

const PageNotFound = () => {
  return (
    <MainLayout title="Page not found">
      <div className="c-Page-not-found">
        <h1>404</h1>
        <p>Oops! The page your were looking for does not exist!</p>
        <NavLink to="/">Go to Home</NavLink>
      </div>
    </MainLayout>

  );
};

export default PageNotFound;
