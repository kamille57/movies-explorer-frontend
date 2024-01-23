import React from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

// const ProtectedRoute = ({ element: Component, ...props }) => {
//   return (
//     props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />
//   )
// }

function ProtectedRoute({ isLoggedIn, isLoading, Element, ...props }) {
    return (
        isLoading ? <Preloader /> : (isLoggedIn ? <Element {...props} /> : <Navigate to="/signin" />)
    );
}

export default ProtectedRoute;