import React from 'react';
import { NavLink } from 'react-router-dom';
import ENUMS from '../config/enums';

const Teaser = ({heading, description, link, type, variation}) => {

    const determineVariation = () => {
        switch (variation) {
            case ENUMS.teaserVariation.LIGHT_BLUE: {
                return "light-blue";
            }
            default: {
                return "light-blue";
            }
        }
    };

    const determineType = () => {
        switch(type) {
            case ENUMS.teaserType.CALCULATOR: {
                return "calculator"
            }
            default: {
                return "calculator";
            }
        }
    };

  return (
    <NavLink to={link} className = {`c-Teaser c-Teaser--${determineVariation()} c-Teaser--${determineType()}`}>
        <div className = "c-Teaser__Info">
            <h1>{heading}</h1>
            <p>{description}</p>
        </div>
    </NavLink>
  )
}

export default Teaser