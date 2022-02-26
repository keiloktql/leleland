import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Title from './Title';
import ENUMS from '../config/enums';

const MainLayout = ({ children, title, headerTheme=ENUMS.headerTheme.LIGHT, headerFixed=true }) => {
    return (
        <>
            <Header theme={headerTheme} fixed={headerFixed} />
            <Title title={title} />
            <main className={`c-Main c-Main--padded`}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;