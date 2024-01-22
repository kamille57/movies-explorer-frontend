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
    const [card, setMovies] = useState([]);

    const navigate = useNavigate();
    const api = new MainApi();
    const moviesApi = new MoviesApi();

    console.log("currentUser", currentUser);
    console.log("isLoggedIn", isLoggedIn);
    console.log("setMovies", card);

    useEffect(() => {  
        console.log('Сейчас будем проверять ТОКЕН');  
        const token = localStorage.getItem('jwt');  
        console.log('jwt', token);
        if (token) {  
            Promise.all([api.getUserInfo(token), moviesApi.getInitialMovies()])  
            .then(([userData, initialMovies]) => {  
                console.log(userData);
                console.log(initialMovies);

                setCurrentUser(userData);  
                setMovies(initialMovies);  
                setIsLoggedIn(true);  
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
                navigate("/"); // Add this line
                setIsLoggedIn(true)
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
        console.log("upduser", updatedUser);
        api.setUserInfo(updatedUser)
            .then(({ email, name }) => {
                console.log({ email, name });
                setCurrentUser({ email, name });

            })
            .catch((error) => {
                console.error(error);
            });
    };

    function checkContent() {
        api.getUserInfo()
            .then((res) => {
                console.log('Тест перед сеттерами');
                setCurrentUser(res);
            })
            .catch(err => console.log(err));
    }

    function handleRegister({ name, email, password }) {
        setIsLoading(true)

        api.register({ name, email, password })
            .then(res => {
                localStorage.setItem('jwt', res.token);
                console.log("handlereg");
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
                console.log("signout2");
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
                            card={card}
                            isLoggedIn={isLoggedIn}
                        />}
                    />
                    <Route
                        path="/saved-movies"
                        element={<ProtectedRoute
                            Element={SavedMovies}
                            isLoggedIn={isLoggedIn}
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