import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoutes() {
    const navigate = useNavigate();
    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        const userData = localStorage.getItem("userData");

        if (!jwtToken || !userData) {
            // If either the JWT token or userData is missing in local storage, redirect to the login page
            navigate('/auth-choice');
        }
    }, [navigate]);

    return <Outlet />;
}
