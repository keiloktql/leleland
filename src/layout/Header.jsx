import React, { useState, useEffect } from 'react';
import Enums from '../config/enums';
import { NavLink, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import LogoDark from '../assets/images/Logo-dark.png';
import LogoLight from '../assets/images/Logo-light.png';
import useComponentVisible from "../hooks/useComponentVisible";

const Header = ({ theme = Enums.headerTheme.LIGHT, fixed = true }) => {

    const navigate = useNavigate();

    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const { ref } = useComponentVisible(showProfilePopup, setShowProfilePopup);


    // Handler
    const handleProfilePicClick = () => {
        setShowProfilePopup((prevState) => !prevState);
    };

    const handleLogOutClick = () => {
        // clearLocalStorage();
        // history.push("/login");
        // setTimeout(() => {
        //     toast.success("Successfully logged out!");
        // }, 0);
    };

    // Check if user is logged in

    return (
        <header className={`l-Header l-Header--${fixed ? "fixed" : "static"} l-Header--${theme === Enums.headerTheme.DARK ? "dark" : "light"}`}>
            <div className="c-Header">
                <div className="c-Header__Logo">
                    <NavLink to="/">
                        {
                            theme === Enums.headerTheme.DARK ?
                                <img src={LogoLight} alt="Logo" /> :
                                <img src={LogoDark} alt="Logo" />
                        }

                    </NavLink>
                </div>

                <div className="c-Header__Links">
                    <NavLink to="/gallery">Gallery</NavLink>
                </div>

                <div className="c-Header__Right" ref={ref}>
                    <Tooltip title="Account" arrow>
                        <span className="c-Header__Avatar" onClick={handleProfilePicClick} />
                    </Tooltip>
                    {
                        showProfilePopup ?
                            <div className="l-Header__Profile-pop-up">
                                <div className="c-Header__Profile-pop-up">
                                    <button onClick={() => navigate("/account")}>
                                        My Account
                                    </button>
                                    <hr />
                                    <button onClick={handleLogOutClick}>Log out</button>
                                </div>
                            </div> :
                            null
                    }

                    {/* <button className={`c-Btn c-Btn__Header-Login c-Btn__Header-Login--${theme === Enums.headerTheme.DARK ? "light" : "dark"}`} onClick={() => navigate("/login")}>Login</button> */}
                </div>
            </div>

        </header>
    );
};

export default Header;