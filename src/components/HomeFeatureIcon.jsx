import React from 'react';
import ENUMS from '../config/enums';
import { Icon } from '@iconify/react';
import { Col } from 'react-bootstrap';

const HomeFeatureIcon = ({ type, heading, description }) => {
  const renderIcon = () => {
    if (type === ENUMS.homeFeatureIcon.VIEW) {
      return <Icon className="c-Icon c-Icon__View" icon="akar-icons:eye" />
    } else if (type === ENUMS.homeFeatureIcon.COMMENT) {
      return <Icon className="c-Icon c-Icon__Comment" icon="bi:chat" />
    } else {
      return <Icon className="c-Icon c-Icon__Like" icon="emojione:smiling-face-with-heart-eyes" />
    }
  };

  const className = () => {
    if (type === ENUMS.homeFeatureIcon.VIEW) {
      return "view";
    } else if (type === ENUMS.homeFeatureIcon.COMMENT) {
      return "comment";
    } else {
      return "like";
    }
  };

  return (
    <Col lg={12} xl={4} className={`c-Home-feature-icon c-Home-feature-icon--${className()}`}>
      <div className="c-Home-feature-icon__Icon">
        {renderIcon()}
      </div>
      <div className="c-Home-feature-icon__Desc">
        <h1>{heading}</h1>
        <p>{description}</p>
      </div>
    </Col>
  );
};

export default HomeFeatureIcon;