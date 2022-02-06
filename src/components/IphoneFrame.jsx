import React from 'react';

const IphoneFrame = ({ children }) => {
    return (
        <figure className="l-Iphone-frame">
            <div className="c-Iphone-frame">
                <span className="c-Iphone-frame__Speaker"></span>
                <span className="c-Iphone-frame__Camera"></span>
                <div className="c-Iphone-frame__Content">
                    {children}
                </div>
            </div>

        </figure>
    );
};

export default IphoneFrame;