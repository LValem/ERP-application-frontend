// /security/ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Render nested routes if authenticated
    return <Outlet />;
};

export default ProtectedRoutes;
