import React from 'react';
import useToken from '../token_helper/useToken';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { token } = useToken();
    const isLoggedIn = token ? true : false;
    const redirectState = { unauthorized: true };
    const currentPath = useLocation().pathname;
    //   Guard against re-attempted logins
    return (isLoggedIn) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={redirectState} />
    );
};

export default PrivateRoute;