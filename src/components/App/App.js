import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "../Main/Main.js"
import Movies from "../Movies/Movies.js"
import SavedMovies from "../SavedMovies/SavedMovies.js"
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js"
import NotFound from "../NotFound/NotFound.js"

function App() {
    return (
        <div className="page">
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/saved-movies" element={<SavedMovies />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>

    );
}

export default App;