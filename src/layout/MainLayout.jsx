import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Title from './Title';

const MainLayout = ({ children, title, headerTheme, headerFixed }) => {
    return (
        <>
            <Header theme={headerTheme} fixed={headerFixed} />
            <Title title={title} />
            <main className={`c-Main c-Main--${headerFixed ? "padded" : "normal"}`}>
                {children}
            </main>
            <Footer />
        </>

    )
};

export default MainLayout;