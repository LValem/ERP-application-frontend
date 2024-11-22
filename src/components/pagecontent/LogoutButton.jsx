import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;
