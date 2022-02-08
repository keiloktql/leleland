import React from 'react';
import Routes from './Routes';

import './assets/sass/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { useAuth } from './utils/firebase';
import FirebaseProvider from './context/FirebaseProvider';


const App = () => {

    const currentUser = useAuth();
    console.log(currentUser)

    return (
        <>
            <FirebaseProvider currentUser={currentUser}>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes />
            </FirebaseProvider>

        </>
    );
};

export default App;