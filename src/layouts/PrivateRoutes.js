import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoutes() {
    const navigate = useNavigate();
    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
            // If either the JWT token or userData is missing in local storage, redirect to the login page
            navigate('/auth-choice');
        }
    }, [navigate]);

    return <Outlet />;
}
