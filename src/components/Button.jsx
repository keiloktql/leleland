import React from 'react';
import ENUMS from '../config/enums';

const Button = ({ text, variation, arrow = false, handleOnClick }) => {

    const determineVariation = () => {
        let classname = "";

        switch (variation) {
            case ENUMS.btnVariation.BLACK: {
                classname="Black";
                break;
            }
            case ENUMS.btnVariation.WHITE: {
                classname="White";
                break;
            }
            case ENUMS.btnVariation.PRIMARY: {
                classname="Primary";
                break;
            }
            case ENUMS.btnVariation.DANGER: {
                classname="Danger";
                break;
            }
            case ENUMS.btnVariation.DANGER_OUTLINE: {
                classname="Danger-outline";
                break;
            }
            case ENUMS.btnVariation.EMPTY: {
                classname="Empty";
                break;
            }
            default: {
                classname="Primary";
            }
        }
        return classname;
    };

    return (
        <button onClick={handleOnClick && (() => handleOnClick())} type={handleOnClick ? "button" : "submit"} className={`c-Btn c-Btn__${determineVariation()} ${arrow && "c-Btn--arrow"}`}>
            {text}
            {
                arrow &&
                <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="c-Btn__Arrow">
                    <g className="c-Btn__Arrow-head">
                        <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="2" />
                    </g>
                    <g className="c-Btn__Arrow-body">
                        <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="2" />
                    </g>
                </svg>
            }
        </button>
    )
}

export default Button;