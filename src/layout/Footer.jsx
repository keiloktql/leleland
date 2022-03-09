import React from 'react';
import LogoColorful from '../assets/images/Logo-colorful.png';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="l-Footer">
            <div className="c-Footer">
                <div className="c-Footer__Logo">
                    <img src={LogoColorful} alt="Logo" />
                </div>
                <div className = "c-Footer__Links c-Links">
                    {/* <a className = "c-Links__Who" href="https://keilokimnida.github.io/" target="_blank" rel="noopener noreferrer">Kei Lok</a>
                    <p>|</p> */}
                    <a className = "c-Links__GitHub" href="https://github.com/keilokimnida" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <div className="c-Footer__Copyright">
                    <p>Copyright &#169; 2022 Tham Kei Lok. All rights reserved.</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;