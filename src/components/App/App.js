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
import MainApi from '../../utils/MainApi.js';
import MoviesApi from '../../utils/MoviesApi.js';
import InfoToolTipSuccess from "../InfoToolTipSuccess/InfoToolTipSuccess.js";
import InfoToolTipFail from "../InfoToolTipFail/InfoToolTipFail.js"
import Preloader from "../Preloader/Preloader";
import { handleError } from "../../utils/handleError.js"
import { profileErrors } from '../../constants/constants.js';


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setMovies] = useState([]);
    const [isToolTipSuccessOpen, setIsToolTipSuccessOpen] = useState(false);
    const [isToolTipFailOpen, setIsToolTipFailOpen] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [serverError, setServerError] = useState('');
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(false);

    const navigate = useNavigate();
    const api = new MainApi();
    const moviesApi = new MoviesApi();

    useEffect(() => {
        const checkToken = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('jwt');
            if (!token) {
                setIsLoggedIn(false);
                setIsLoading(false);
                setIsCheckingAuth(false);
                return;
            }

            try {
                const userData = await api.getUserInfo(token);
                setCurrentUser(userData);
                const initialMovies = await moviesApi.getInitialMovies();
                setMovies(initialMovies);
                setIsLoggedIn(true);
                setIsSaveBtnDisabled(true);
            } catch (err) {
                console.log('Ошибка при получении данных пользователя:', err);
                localStorage.removeItem('jwt');
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
                setIsCheckingAuth(false);
            }
        };

        checkToken();
    }, []);

    if (isCheckingAuth) {
        return <Preloader />;
    }

    function closeAllPopups() {
        setIsToolTipSuccessOpen(false);
        setIsToolTipFailOpen(false);
    }

    function onRegister() {
        setIsToolTipSuccessOpen(true);
    }

    function onError() {
        setIsToolTipFailOpen(true);
    }
    

    function handleUpdateProfile({ email, name }) {
        const updatedUser =
            { email, name };
        api.setUserInfo(updatedUser)        
            .then(({ email, name }) => {                
                setCurrentUser({ email, name });
                console.log("currentUser", currentUser);
                setIsSaveBtnDisabled(false);
                console.log('able button here');
                console.log("isSaveBtnDisabled", isSaveBtnDisabled)


            })
            .catch((error) => {
                console.log('DIsable button here');
                const errorMessage = handleError(error, profileErrors);
                setIsSaveBtnDisabled(true)
                setServerError(errorMessage);
            })
    };

    const handleLogin = async ({ email, password }) => { // скобки фигурные
        setIsLoading(true);
        try {
            const authData = await api.authorize(email, password);
            localStorage.setItem('jwt', authData.token);
            const userData = await api.getUserInfo(authData.token);
            setCurrentUser(userData);
            setIsLoggedIn(true);
            navigate('/');
            onRegister();
        } catch (err) {
            onError();
            console.log('Ошибка при получении данных пользователя:', err);
        } finally {
            setIsLoading(false);
        }
    };

    function handleRegister({ name, email, password }) {
        setIsLoading(true);
        console.log('Регистрация с данными:', { name, email, password });
        api.register({ name, email, password })
            .then(res => {
                console.log('Попытка авторизации для:', email);
                return api.authorize(email, password);
            })
            .then(data => {
                localStorage.setItem('jwt', data.token);
                setCurrentUser({ email, name });
                setIsLoggedIn(true);
                navigate("/");
                onRegister();
            })
            .catch(err => {
                onError();
                console.log('Ошибка в функции регистрации/авторизации:', err);
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
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                            isRemovable={false}
                        />}
                    />

                    <Route
                        path="/saved-movies"
                        element={<ProtectedRoute
                            Element={SavedMovies}
                            isLoggedIn={isLoggedIn}
                            isLoading={isLoading}
                            isRemovable={true}
                        />}
                    />
                    <Route path="/profile" element={<Profile
                        onUpdateProfile={handleUpdateProfile}
                        signOut={signOut}
                        isSaveBtnDisabled={isSaveBtnDisabled}
                        serverError={serverError}
                    />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <InfoToolTipSuccess
                    isOpen={isToolTipSuccessOpen}
                    onClose={closeAllPopups}
                />
                <InfoToolTipFail
                    isOpen={isToolTipFailOpen}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;