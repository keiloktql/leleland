import React from 'react';
import Enums from '../config/enums';

const Header = ({theme}) => {

    // Check if user is logged in

    return (
        <header className = "c-Header">
            <div className = "c-Header__Logo">

            </div>

            <div className = "c-Header__Links">

            </div>

            <div className = "c-Header__Btns">
                <button className="c-Btn c-Btn__Login c-Btn__Login--dark">Login</button>
            </div>
        </header>
    );
};

export default Header;