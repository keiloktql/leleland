import React from 'react';
import { Route, BrowserRouter as Router, Routes as Switch, Navigate, Outlet, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Gallery from './pages/Gallery';
import ForgotPassword from './pages/ForgotPassword';

import PageNotFound from './pages/error/PageNotFound';

import Sandbox from './pages/Sandbox';

const Routes = () => {

    const RequireAuth = () => {
        let location = useLocation();

        // Temporary condition due to lack of login feature
        if (1 !== 1) {
            // Redirect them to the /login page, but save the current location they were
            // trying to go to when they were redirected. This allows us to send them
            // along to that page after they login, which is a nicer user experience
            // than dropping them off on the home page.
            return <Navigate to="/" state={{ from: location }} />;
        }

        return <Outlet />;
    }

    return (
        <Router>
            <Switch>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate replace to="/"/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/gallery" element={<Gallery />} />
                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/dev" element={<Sandbox />} />
                    <Route path="/account" element={<Home />} />
                </Route>
                {/* Error Routes */}
                <Route path="*" element={<PageNotFound/>} />
            </Switch>
        </Router>
    );
};

export default Routes;

    // With reference to:
    // https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6