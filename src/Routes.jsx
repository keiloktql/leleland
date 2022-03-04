import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes as Switch, Navigate, Outlet, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Gallery from './pages/Gallery';
import ForgotPassword from './pages/ForgotPassword';

import PageNotFound from './pages/error/PageNotFound';

import Sandbox from './pages/Sandbox';
import Calculator from './pages/projects/Calculator';
import MyAccount from './pages/MyAccount';
import LoggedOut from './pages/LoggedOut';
import Unauthorised from './pages/error/Unauthorised';
import GenericError from './pages/error/GenericError';
import { useAuth } from './utils/firebase';
import LoggedInError from './pages/error/LoggedInError';
import Blueberry from './pages/projects/Blueberry';

const Routes = () => {

    const [currentUser, loading] = useAuth();

    const RequireAuthGuard = () => {

        if (!currentUser && !loading) {
            return <Unauthorised />;
        }

        return <Outlet />;
    };

    const NoAuthGuard = () => {

        if (!currentUser && !loading) {
            return <Outlet />;
        }

        return <LoggedInError />;
    };

    const ScrollToTop = ({ children }) => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return <>{children}</>;
    }

    return (
        <Router>
            <ScrollToTop>
                <Switch>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Navigate replace to="/" />} />
                    {/* Only avaiable for anon users */}
                    <Route element={<NoAuthGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/logged-out" element={<LoggedOut />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Route>
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/gallery/calculator" element={<Calculator />} />
                    <Route path="/gallery/blueberry" element={<Blueberry />} />
                    {/* Protected Routes */}
                    <Route element={<RequireAuthGuard />}>
                        <Route path="/dev" element={<Sandbox />} />
                        <Route path="/account" element={<MyAccount />} />
                    </Route>
                    {/* Error Routes */}
                    <Route path="*" element={<PageNotFound />} />

                </Switch>
            </ScrollToTop >
        </Router>
    );
};

export default Routes;

    // With reference to:
    // https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6