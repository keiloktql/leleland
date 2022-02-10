import React, { useState, useEffect } from 'react';
import Enums from '../config/enums';
import { NavLink, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import LogoDark from '../assets/images/Logo-dark.png';
import LogoLight from '../assets/images/Logo-light.png';
import { useAuth } from '../utils/firebase';

const Header = ({ theme = Enums.headerTheme.LIGHT, fixed = true }) => {

    const navigate = useNavigate();
    const [currentUser, loading] = useAuth();

    const [showAvatar, setShowAvatar] = useState(false);

    // Handler
    const handleProfilePicClick = () => {
        navigate("/account");
    };

    // Check if user is logged in
    useEffect(() => {
        let componentMounted = true;
        (async () => {
            try {
                if (componentMounted) {
                    setShowAvatar(() => {
                        if (currentUser) {
                            console.log(currentUser);
                            return true;
                        } else {
                            return false;
                        }
                    })
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return (() => {
            componentMounted = false;
        });
    }, [currentUser]);

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

                <div className="c-Header__Right">
                    {
                        showAvatar ?
                            <Tooltip title="Account" arrow>
                                <span className="c-Header__Avatar" onClick={handleProfilePicClick} />
                            </Tooltip> :
                            <button className={`c-Btn c-Btn__Header-Login c-Btn__Header-Login--${theme === Enums.headerTheme.DARK ? "light" : "dark"}`} onClick={() => navigate("/login")}>Login</button>
                    }
                </div>
            </div>

        </header>
    );
};

export default Header;