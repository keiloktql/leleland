import React, { useEffect} from 'react';
import MainLayout from '../layout/MainLayout';
import LogoColorful from '../assets/images/Logo-colorful.png';
import { NavLink, useNavigate } from 'react-router-dom';
import IphoneFrame from '../components/IphoneFrame';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Container, Row, Col } from 'react-bootstrap';

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
            <h1>LeLeLand</h1>
            <p>A collection of projects and components built using React & Sass.</p>
            <NavLink to="/gallery" >View Gallery</NavLink>
          </div>

        </div>

        {/* Gradient */}
        <div className="c-Home__Gradient">
        <span></span>
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