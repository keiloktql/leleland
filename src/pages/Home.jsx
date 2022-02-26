import React, { useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import LogoColorful from '../assets/images/Logo-colorful.png';
import { NavLink, useNavigate } from 'react-router-dom';
import IphoneFrame from '../components/IphoneFrame';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Container, Row, Col } from 'react-bootstrap';
import HomeFeatureIcon from '../components/HomeFeatureIcon';
import ENUMS from '../config/enums';

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <MainLayout title="LeLeLand">
      <Container fluid={true} className="c-Home">
        <div className="c-Home__Greetings">
          {/* Greetings */}
          <div className="c-Home__Greetings-text">
            <div className="c-Greetings-text c-Greetings-text--1">
              <div className="c-Greetings-text__Title c-Greetings-text__Title--1">Discover</div>
            </div>
            <div className="c-Greetings-text c-Greetings-text--2">
              <div className="c-Greetings-text__Title c-Greetings-text__Title--2">Awesome</div>
            </div>
            <div className="c-Greetings-text c-Greetings-text--3">
              <div className="c-Greetings-text__Title c-Greetings-text__Title--3">Projects</div>
            </div>
          </div>
          <div className="c-Home__Greetings-bottom">
            <p>Built using React & Sass by Kei Lok.</p>
            <button type="button" className="c-Btn c-Btn__Primary c-Btn--arrow" onClick={() => navigate("/gallery")}>
              View Gallery
              <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="c-Btn__Arrow">
                <g className="c-Btn__Arrow-head">
                  <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="2" />
                </g>
                <g className="c-Btn__Arrow-body">
                  <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="2" />
                </g>
              </svg>
            </button>
          </div>

        </div>

        <div className="c-Home__Features c-Features">
          <div className="c-Features__Top">
            <h1>How it works</h1>
            <p>Sign up now to have all access to these features. Free of charge.</p>
          </div>
          <Row className="c-Features__Icons">
            <HomeFeatureIcon
              type={ENUMS.homeFeatureIcon.VIEW}
              heading="Get Inspired"
              description="View awesome projects"
            />
            <HomeFeatureIcon
              type={ENUMS.homeFeatureIcon.COMMENT}
              heading="Comment"
              description="This is cool!"
            />
            <HomeFeatureIcon
              type={ENUMS.homeFeatureIcon.LIKE}
              heading="Like"
              description="Show support"
            />
          </Row>
          <div className="c-Features__CTA">
            <button className="c-Btn c-Btn__Black c-Btn--arrow" onClick={() => navigate("/sign-up")}>
              Sign up now
              <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="c-Btn__Arrow">
                <g className="c-Btn__Arrow-head">
                  <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="2" />
                </g>
                <g className="c-Btn__Arrow-body">
                  <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="2" />
                </g>
              </svg>
            </button>
          </div>

        </div>

        <div className="c-Home__Sign-up-ad">
          {/* Sign up Ad */}
          <Row className="c-Sign-up-ad">
            <Col md={12} lg={8} className="c-Sign-up-ad__Left">
              <h1>Sign up to Gain All Access to</h1>
              <img src={LogoColorful} alt="Logo" />
              <p>View the entire collection and "like" your favourite projects! Free of Charge.</p>
              <button type="button" className="c-Btn c-Btn__Primary" onClick={() => navigate("/sign-up")}>Sign Up</button>
            </Col>

            <Col md={12} lg={4} className="c-Sign-up-ad__Right">
              <IphoneFrame
                children={
                  <div className="c-Home__Screen c-Mobile">
                    <div className="c-Mobile__Header">
                      <h1>LeLeLand</h1>
                      <span className="c-Mobile__Hamburger">
                        <IconContext.Provider className="c-Mobile__Icon" value={{ color: "#fff", size: "21px" }}>
                          <GiIcons.GiHamburgerMenu />
                        </IconContext.Provider>
                      </span>
                    </div>

                    <div className="c-Mobile__Sub-header">
                      <h2>Color Palette Generator</h2>
                    </div>

                    <div className="c-Mobile__Demo c-Demo">
                      <div className="c-Demo__Dates">
                        <p>Last updated 4 hours ago</p>
                      </div>

                      <div className="c-Demo__Magic">
                        <div className="c-Demo__Magic-default">
                          <IconContext.Provider className="c-Mobile__Paint" value={{ color: "#172b4d", size: "40px" }}>
                            <AiIcons.AiFillFormatPainter />
                          </IconContext.Provider>
                          <h1>Click Generate to start!</h1>
                        </div>
                        <div className="c-Demo__Magic-colors">

                          <span className="c-Demo__Color">4E4187</span>
                          <span className="c-Demo__Color">3083DC</span>
                          <span className="c-Demo__Color">F8FFE5</span>
                          <span className="c-Demo__Color">7DDE92</span>
                        </div>
                      </div>


                      <div className="c-Demo__Btns">
                        <button type="button" className="c-Btn c-Btn__CP c-Btn__Primary">Generate</button>
                      </div>

                    </div>
                  </div>
                }
              />
            </Col>
          </Row>
        </div>
      </Container>
    </MainLayout>

  );
};

export default Home;