import React from 'react';
import Title from './Title';

const MinimalistLayout = ({children, title}) => {
    return <>
        <Title title={title} />
        <main className={`c-Minimalist-layout`}>
            {children}
        </main>
    </>;
};

export default MinimalistLayout;