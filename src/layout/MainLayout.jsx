import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Title from './Title';

const MainLayout = ({ children, title, headerTheme, headerFixed }) => {
    return (
        <>
            <Header theme={headerTheme} headerFixed={headerFixed} />
            <Title title={title} />
            <main className="c-Main">
                {children}
            </main>
            <Footer />
        </>

    )
};

export default MainLayout;