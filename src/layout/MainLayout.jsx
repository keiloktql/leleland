import React from 'react';

import Header from './Header';
import Title from './Title';

const MainLayout = ({ children, title, headerTheme, headerFixed }) => {
    return (
        <main className = "c-Main">
            <Header theme={headerTheme} headerFixed={headerFixed} />
            <Title title={title} />
            <div className = "c-Main__Content">
                {children}
            </div>
        </main>
    )
};

export default MainLayout;