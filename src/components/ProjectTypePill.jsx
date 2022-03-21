import React from 'react'
import ENUMS from '../config/enums'

const ProjectTypePill = ({type, time}) => {

    const renderClassName = () => {
        if (type === ENUMS.projectType.INTERACTIVE) {
            return "c-Project-type-pill--interactive";
        } else {
            return "c-Project-type-pill--blog";
        }
    };

    const renderDisplayText = () => {
        if (type === ENUMS.projectType.INTERACTIVE) {
            return "Interactive";
        } else {
            return `Blog • ${time} Mins`;
        }
    };

    return (
        <div className={`c-Project-type-pill ${renderClassName()}`}>
            <h1>{renderDisplayText()}</h1>
        </div>
    );
};

export default ProjectTypePill;