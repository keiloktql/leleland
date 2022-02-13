import React, { createRef } from 'react';
import { NavLink } from 'react-router-dom';

const SubHeader = ({ name = "No Name", subLinkArr }) => {

    const handleScroll = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    };

    return (
        <div className="l-Sub-header">
            <div className="c-Sub-header">
                <div className="c-Sub-header__Name">
                    <h1 onClick={() =>   window.scrollTo(0, 0)}>{name}</h1>
                </div>
                <div className="c-Sub-header__Links">
                    {
                        subLinkArr.map((subLink, index) => (
                            <p onClick={() => handleScroll(subLink.ref)} key={index}>{subLink.name}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SubHeader;