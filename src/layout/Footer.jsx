import React from 'react';
import LogoLight from '../assets/images/Logo-light.png';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="l-Footer">
            <div className="c-Footer">
                <div className="c-Footer__Logo">
                    <img src={LogoLight} alt="Logo" />
                </div>
                <div className = "c-Footer__Links c-Links">
                    <a className = "c-Links__Who" href="https://keilokimnida.github.io/" target="_blank" rel="noopener noreferrer">LeLe</a>
                    <p>|</p>
                    <a className = "c-Links__GitHub" href="https://github.com/keilokimnida/leleland" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <div className="c-Footer__Copyright">
                    <p>LeLe &#169; Copyright 2022. All rights reserved.</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;