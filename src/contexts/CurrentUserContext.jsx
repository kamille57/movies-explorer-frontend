import React from "react";

const CurrentUserContext = React.createContext({
    currentUser: null,
    isLoggedIn: false,
    setCurrentUser: () => {},
    setLoggedIn: () => {}
});

export default CurrentUserContext;