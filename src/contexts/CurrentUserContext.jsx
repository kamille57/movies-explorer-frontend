import React from "react";

const CurrentUserContext = React.createContext({
    currentUser: null,
    loggedIn: false,
    setCurrentUser: () => {},
    setLoggedIn: () => {}
});

export default CurrentUserContext;