import React from 'react'
import { useNavigate, Navigate, Outlet, redirect } from 'react-router-dom'

const UnAuthProtectedRoutes = ({
    token,
    userType,
    children,
    ridirect = "/home"
}) => {
    const enums = {
        employer: 'employer',
        candidate: 'candidate',
        mentor: 'mentor'
    }

    if (token) {
        if (userType === enums.employer) {
            return <Navigate to={'/employer/profile'} />;
        } else if (userType === enums.candidate) {
            return <Navigate to={'/candidate/profile'} />;
        } else if (userType === enums.mentor) {
            return <Navigate to={'/mentor/profile'} />;
        }
    }

    return children ? children : <Outlet />;

}

export default UnAuthProtectedRoutes;