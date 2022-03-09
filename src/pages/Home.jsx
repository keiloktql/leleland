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
import KeiLok from '../assets/images/keilok.png';
import IphoneBG from '../assets/videos/Iphone-BG.mp4';
import { Icon } from '@iconify/react';

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
              <p>Built using React & Sass by
                <a href="https://www.linkedin.com/in/thamkeilok/" target="_blank" rel="noopener noreferrer">
                &nbsp;Kei Lok. <Icon className="c-Icon--open-new" icon="ic:twotone-open-in-new" />
                </a>
              </p>
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
                  <video autoPlay muted="muted" loop>
                    <source src={IphoneBG} type="video/mp4" />
                  </video>
                  <div className="c-Mobile__Glass">
                    <div className='c-Mobile__Avatar'>
                      <img src={KeiLok} alt="Avatar" />
                    </div>
                    <div className="c-Mobile__Middle">
                      <h1>Hi, I am Kei Lok</h1>
                      <p>Information Technology Student at Singapore Polytechnic</p>
                    </div>
                    <div className="c-Mobile__Bottom">
                      <p>This is a showcase of some projects that I built. Enjoy!</p>
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
            <Teaser
              heading="BLUEBERRY"
              description="Clothing Store Concept"
              link="/gallery/blueberry"
              type={ENUMS.teaserType.BLUEBERRY}
              variation={ENUMS.teaserVariation.BLACK_GREY}
            />
          </div>
        </div>

      </Container>
    </MainLayout>

  );
};

export default Home;