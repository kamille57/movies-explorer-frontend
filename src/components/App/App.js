import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import MainApi from '../../utils/MainApi.js'
import MoviesApi from '../../utils/MoviesApi.js'


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    const navigate = useNavigate();
    const api = new MainApi();
    const moviesApi = new MoviesApi();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
          Promise.all([api.getUserInfo(token), moviesApi.getInitialMovies()])
            .then(([userData, initialMovies]) => {
              setIsLoggedIn(true);
              setCurrentUser(userData);
              setMovies(initialMovies);
            })
            .catch((err) => {
              console.log('Ошибка при получении данных пользователя:', err);
              localStorage.removeItem('jwt');
              setIsLoggedIn(false);
              setCurrentUser(null);
            });
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      }, []);


    function handleLogin(email, password) {
        setIsLoading(true)
        api.authorize(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                checkContent();
                setIsLoggedIn(true);
                navigate("/");
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
        ;
    }

    function handleUpdateProfile({ email, name }) {
        const updatedUser =
            { email, name };
        api.setUserInfo(updatedUser)
            .then(({ email, name }) => {
                setCurrentUser({ email, name });

            })
            .catch((error) => {
                console.error(error);
            });
    };

    function checkContent() {
        api.getUserInfo()
            .then((res) => {
                console.log("res", res);
                setCurrentUser(res);
                setIsLoggedIn(true);
            })
            .catch(err => console.log(err));
    }

    function handleRegister({ name, email, password }) {
        setIsLoading(true)
        api.register({ name, email, password })
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setCurrentUser({ email, name });
                setIsLoggedIn(true)
                navigate("/");
            })
            .catch(err => {
                console.log('Ошибка в функции регистрации', err);
            })
            .finally(() => setIsLoading(false));
    }

    function signOut() {
        api.signOut()
            .then(() => {
                localStorage.removeItem('jwt');
                setCurrentUser(null);
                setIsLoggedIn(false);
                navigate("/");
            })
            .catch(err => console.log(err));
    }
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path="/" element={<Main
                        isLoggedIn={isLoggedIn}
                    />} />
                    <Route path="/signup" element={<Register
                        onRegister={handleRegister}
                        isLoading={isLoading}
                    />} />
                    <Route path="/signin" element={<Login
                        setCurrentUser={setCurrentUser}
                        onLogin={handleLogin}
                        isLoading={isLoading}
                    />} />
                    <Route
                        path="/movies"
                        element={<ProtectedRoute
                            Element={Movies}
                            cards={cards}
                            isLoggedIn={true}
                        />}
                    />
                    
                    {console.log(savedMovies)}
                    <Route
                        path="/saved-movies"
                        element={<ProtectedRoute
                            Element={SavedMovies}
                            cards={savedMovies}
                            isLoggedIn={true}
                        />}
                    />
                    <Route path="/profile" element={<Profile
                        onUpdateProfile={handleUpdateProfile}
                        signOut={signOut}
                    />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;