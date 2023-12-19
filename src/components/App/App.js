import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";

function App() {
    const [currentUser, setCurrentUser] = useState({});

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/signin" element={<Login />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/saved-movies" element={<SavedMovies />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;