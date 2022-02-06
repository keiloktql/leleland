import React from 'react';
import MainLayout from '../layout/MainLayout';
import LogoColorful from '../assets/images/Logo-colorful.png';
import { NavLink } from 'react-router-dom';


const Home = () => {
  return (
    <MainLayout title="Home">
      <div className="c-Home">
        <div className="c-Home__Greetings">
          {/* Greetings */}
          <div className="c-Home__Greetings-text">
            <h1>LeLeLand</h1>
            <p>A collection of projects and components built using React & Sass.</p>
            <NavLink to="/gallery" >View Gallery</NavLink>
          </div>
        </div>

        <div className="c-Home__Sign-up-ad">
          {/* Sign up Ad */}
          <div className="c-Sign-up-ad">
            <div className="c-Sign-up-ad__Left">
              <h1>Sign up to Gain All Access to</h1>
              <img src={LogoColorful} alt="Logo" />
              <p>View the entire collection and "like" your favourite projects! Free of Charge.</p>
              <button type="button" className="c-Btn c-Btn__Primary">Sign Up</button>
            </div>

            <div className="c-Sign-up-ad__Right">
              <span className="c-Sign-up-ad__Mobile c-Mobile">
                <div className = "c-Mobile__Screen">
                  
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>

  );
};

export default Home;