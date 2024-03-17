import React from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function ProtectedRoute({ isLoggedIn, isLoading, Element, ...props }) {

    return (
        isLoading ? <Preloader /> : (isLoggedIn ? <Element {...props} /> : <Navigate to="/" />)
    );
}

export default ProtectedRoute;