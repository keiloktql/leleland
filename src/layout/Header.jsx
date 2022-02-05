import React from 'react';
import Enums from '../config/enums';
import { NavLink } from 'react-router-dom';

import LogoDark from '../assets/images/Logo-dark.png';
import LogoLight from '../assets/images/Logo-light.png';

const Header = ({ theme = Enums.headerTheme.DARK, fixed = true }) => {

    // Check if user is logged in

    return (
        <header className="l-Header">
            <div className="c-Header">
                <div className="c-Header__Logo">
                    <NavLink to="/">
                        <img src={LogoDark} alt="Logo" />
                    </NavLink>
                </div>

                <div className="c-Header__Links">
                    <NavLink to="/projects">Projects</NavLink>
                </div>

                <div className="c-Header__Btns">
                    <button className="c-Btn c-Btn__Login c-Btn__Login--dark">Login</button>
                </div>
            </div>

        </header>
    );
};

export default Header;