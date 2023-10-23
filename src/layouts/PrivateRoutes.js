import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoutes() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            // If the user is not logged in, redirect to the login page
            navigate('/auth-choice');
        }
    }, [isLoggedIn, navigate]);

    return <Outlet />;
}
