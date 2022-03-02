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
import Teaser from '../components/Teaser';
import Button from '../components/Button';

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <MainLayout title="LeLeLand">
      <Container fluid={true} className="c-Home">
        <Row className="c-Home__Greetings c-Greetings">
          <Col lg={12} xl={7} className="c-Greetings__Left">
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
              <Button
                text="View Gallery"
                variation={ENUMS.btnVariation.PRIMARY}
                arrow={true}
                handleOnClick={() => navigate("/gallery")}
              />
            </div>
          </Col>

          <Col lg={12} xl={5} className="c-Greetings__Right">
            <IphoneFrame
              variation="light"
              topVariation="dark"
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

        <div className="c-Home__Features c-Features">
          <div className="c-Features__Top">
            <h1>How it works</h1>
            <p>Sign up to have all access to these features. Free of charge.</p>
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
              description="Good vibes only &#128526;"
            />
            <HomeFeatureIcon
              type={ENUMS.homeFeatureIcon.LIKE}
              heading="Like"
              description="Show support"
            />
          </Row>
          <div className="c-Features__CTA">
            <Button
              text="Sign up for free"
              variation={ENUMS.btnVariation.BLACK}
              arrow={true}
              handleOnClick={() => navigate("/sign-up")}
            />
          </div>
        </div>

        <div className="c-Home__Teasers c-Teasers">
          <h1>Check out these projects</h1>
          <div className="c-Teasers__List">
            <Teaser
              heading="Calculator"
              description="Comes in light and dark mode"
              link="/gallery/calculator"
              type={ENUMS.teaserType.CALCULATOR}
              variation={ENUMS.teaserVariation.LIGHT_BLUE}
            />
          </div>
        </div>

      </Container>
    </MainLayout>

  );
};

export default Home;