import React from 'react';
import MainLayout from '../layout/MainLayout';

const Home = () => {
  return (
    <MainLayout title="Home">
      <div className="c-Home">
        <div className="c-Home__Greetings">
          <h1>LeLeLand</h1>
          <p>A collection of projects and components built using React & Sass.</p>
        </div>
        <div className="c-Home__Popular">
          <h2>Popular Projects</h2>
        </div>
      </div>
    </MainLayout>

  );
};

export default Home;