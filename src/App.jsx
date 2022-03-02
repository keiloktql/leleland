import React from 'react';
import Routes from './Routes';

import './assets/sass/main.scss';

import ErrorBoundary from "./pages/error/ErrorBoundary";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {

    return (
        <ErrorBoundary>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes />
        </ErrorBoundary>
    );
};

export default App;