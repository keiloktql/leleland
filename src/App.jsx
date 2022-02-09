import React from 'react';
import Routes from './Routes';

import './assets/sass/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { useAuth } from './utils/firebase';


const App = () => {

    return (
        <>
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

        </>
    );
};

export default App;