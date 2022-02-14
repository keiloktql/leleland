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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
            setShowAvatar(() => false);
        });
    }, [currentUser]);

    useEffect(() => {

        const changeWindowSize = () => {
            setWindowWidth(() => window.innerWidth);
        };
        window.addEventListener("resize", changeWindowSize);
        return () => window.removeEventListener('resize', changeWindowSize);
    }, []);

    return (
        <>

            {
                windowWidth > 1000 ?
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
                                            {
                                                currentUser?.photoURL ?
                                                    <img className="c-Header__Avatar" src={currentUser.photoURL} alt="Avatar" onClick={handleProfilePicClick} /> :
                                                    <span className="c-Header__Avatar" onClick={handleProfilePicClick} />
                                            }

                                        </Tooltip> :
                                        <button className={`c-Btn c-Btn__Header-Login c-Btn__Header-Login--${theme === Enums.headerTheme.DARK ? "light" : "dark"}`} onClick={() => navigate("/login")}>Login</button>
                                }
                            </div>
                        </div>

                    </header> :
                    <MobileHeader
                        theme={theme}
                        fixed={fixed}
                        navigate={navigate}
                        currentUser={currentUser}
                        showAvatar={showAvatar}
                        handleProfilePicClick={handleProfilePicClick}
                    />
            }
        </>
    );
};

const MobileHeader = ({ theme = Enums.headerTheme.LIGHT, fixed = true, navigate, currentUser, showAvatar, handleProfilePicClick }) => {

    const [showLinks, setShowLinks] = useState(false);

    return (
        <header className={`l-Mobile-header l-Mobile-header--${fixed || showLinks ? "fixed" : "static"} l-Mobile-header--${theme === Enums.headerTheme.DARK ? "dark" : "light"}`}>
            <div className="c-Mobile-header">

                <div className="c-Mobile-header__Hamburger">
                    <Hamburger
                        showLinks={showLinks}
                        setShowLinks={setShowLinks}
                        theme={theme}
                    />
                </div>
                <div className="c-Mobile-header__Logo">
                    <NavLink to="/">
                        {
                            theme === Enums.headerTheme.DARK ?
                                <img src={LogoLight} alt="Logo" /> :
                                <img src={LogoDark} alt="Logo" />
                        }
                    </NavLink>
                </div>

                <div className="c-Mobile-header__Right">
                    {
                        showAvatar ?
                            <Tooltip title="Account" arrow>
                                {
                                    currentUser?.photoURL ?
                                        <img className="c-Mobile-header__Avatar" src={currentUser.photoURL} alt="Avatar" onClick={handleProfilePicClick} /> :
                                        <span className="c-Mobile-header__Avatar" onClick={handleProfilePicClick} />
                                }

                            </Tooltip> :
                            null
                    }
                </div>
            </div>
            <div className={`c-Mobile-header-links ${showLinks && "c-Mobile-header-links--show"}`}>
                {
                    currentUser ?
                        <>
                            <NavLink to="/account">Account</NavLink>
                            <hr />
                        </> :
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <hr />
                        </>
                }

                <NavLink to="/gallery">Gallery</NavLink>
                <hr />
            </div>
        </header>
    );

};

const Hamburger = ({ showLinks, setShowLinks, theme }) => {

    const handleHamburgerClick = () => {
        setShowLinks((prevState) => !prevState);
    };

    return (
        <div className={`c-Hamburger ${showLinks && "c-Hamburger--open"} c-Hamburger--${theme === Enums.headerTheme.DARK ? "dark" : "light"}`} onClick={handleHamburgerClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );

};

export default Header;