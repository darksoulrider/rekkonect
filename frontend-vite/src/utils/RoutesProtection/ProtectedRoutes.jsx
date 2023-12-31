import React from 'react'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'


/*
can store tokein & userType in presistant and then retirve it from store

*/


const ProtectedRoutes = ({
    token,
    userType,
    cstmUserType,
    children,
    ridirect = "/home"
    // ridirect = "/login" for time bing no login routes
}) => {

    // get token from the broswer and then send check availability

    if (!token || userType != cstmUserType) {
        return <Navigate to={ridirect} />;
    }

    if (userType != cstmUserType) {
        return <Navigate to={ridirect} />;
        //  also redirect to something went wrong page
    }


    return children ? children : <Outlet />;

}

export default ProtectedRoutes
//