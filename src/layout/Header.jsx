import React from 'react';
import Enums from '../config/enums';
import { NavLink, useNavigate } from 'react-router-dom';

import LogoDark from '../assets/images/Logo-dark.png';
import LogoLight from '../assets/images/Logo-light.png';

const Header = ({ theme = Enums.headerTheme.LIGHT, fixed = true }) => {

    const navigate = useNavigate();
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

                <div className="c-Header__Btns">
                    <button className={`c-Btn c-Btn__Header-Login c-Btn__Header-Login--${theme === Enums.headerTheme.DARK ? "light" : "dark"}`}onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>

        </header>
    );
};

export default Header;