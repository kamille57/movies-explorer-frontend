import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Auth from "../Auth/Auth.js"
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import MainApi from '../../utils/MainApi.js';
import MoviesApi from '../../utils/MoviesApi.js';
import InfoToolTipSuccess from "../InfoToolTipSuccess/InfoToolTipSuccess.js";
import InfoToolTipFail from "../InfoToolTipFail/InfoToolTipFail.js"
import Preloader from "../Preloader/Preloader";
import { handleError } from "../../utils/handleError.js"
import { profileErrors, registerErrors, loginErrors, serverErrors, signOutErrors } from '../../constants/constants.js';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isToolTipSuccessOpen, setIsToolTipSuccessOpen] = useState(false);
    const [isToolTipFailOpen, setIsToolTipFailOpen] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [serverError, setServerError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);

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
                const initialMovies = await moviesApi.getInitialMovies();
                setMovies(initialMovies);
                const userData = await api.getUserInfo(token);
                setCurrentUser(userData);
                const savedMovies = await moviesApi.getSavedMovies()
                setSavedMovies(savedMovies)
                setIsLoggedIn(true);
                setIsLoading(true);
            } catch (err) {
                onError();
                const errorMessage = handleError(err, serverErrors);
                setServerError(errorMessage);
                localStorage.removeItem('jwt');
                localStorage.removeItem('moviesSearchQuery');
                localStorage.removeItem('searchQuery');
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
                setIsCheckingAuth(false);
            }
        };

        checkToken();
    }, []);

    useEffect(function () {
        (async function () {
            if (currentUser) {
                const initialMovies = await moviesApi.getInitialMovies();
                setMovies(initialMovies);
                const savedMovies = await moviesApi.getSavedMovies()
                setSavedMovies(savedMovies)
                setIsLoading(false);
            } 
        })();

    }, [currentUser])

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

    function renewCards() {
        moviesApi.getInitialMovies().then(setMovies);
        moviesApi.getSavedMovies().then(setSavedMovies);
    }

    function handleUpdateProfile({ email, name }) {
        setIsLoading(true);
        const updatedUser =
            { email, name };
        api.setUserInfo(updatedUser)
            .then(({ email, name }) => {
                setCurrentUser({ email, name });
            })
            .catch((error) => {
                onError();
                const errorMessage = handleError(error, profileErrors);
                setServerError(errorMessage);
                setIsEditing(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleLogin = ({ email, password }) => {
        setIsLoading(true);
        api.authorize(email, password)
            .then(authData => {
                localStorage.setItem('jwt', authData.token);
                return api.getUserInfo(authData.token);
            })
            .then(userData => {
                setCurrentUser(userData);
                setIsLoggedIn(true);
                navigate('/movies');
                onRegister();
            })
            .catch(err => {
                onError();
                const errorMessage = handleError(err, loginErrors);
                setServerError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleRegister = ({ name, email, password }) => {
        setIsLoading(true);
        api.register({ name, email, password })
            .then(res => {
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
                const errorMessage = handleError(err, registerErrors);
                setServerError(errorMessage);
            })
            .finally(() => setIsLoading(false));
    };

    function signOut() {
        api.signOut()
            .then(() => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('moviesSearchQuery');
                localStorage.removeItem('searchQuery');
                setCurrentUser(null);
                setIsLoggedIn(false);
                navigate("/");
            })
            .catch(err => {
                onError();
                const errorMessage = handleError(err, signOutErrors);
                setServerError(errorMessage);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path="/"
                        element={<Main
                            isLoggedIn={isLoggedIn}
                        />}
                    />

                    <Route path="/signup"
                        element={<Auth
                            onRegister={handleRegister}
                            isLoading={isLoading}
                            isRegistration={true}
                            serverError={serverError}
                            setServerError={setServerError}
                        />}
                    />

                    <Route path="/signin"
                        element={<Auth
                            onLogin={handleLogin}
                            setCurrentUser={setCurrentUser}
                            isLoading={isLoading}
                            isRegistration={false}
                            serverError={serverError}
                            setServerError={setServerError}
                        />}
                    />

                    <Route
                        path="/movies"
                        element={<ProtectedRoute
                            Element={Movies}
                            cards={movies}
                            savedMovies={savedMovies}
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                            renewCards={renewCards}
                            isRemovable={false}
                        />}
                    />

                    <Route
                        path="/saved-movies"
                        element={<ProtectedRoute
                            Element={SavedMovies}
                            cards={savedMovies}
                            currentUser={currentUser}
                            setSavedMovies={setSavedMovies}
                            isLoggedIn={isLoggedIn}
                            isLoading={isLoading}
                            renewCards={renewCards}
                            isRemovable={true}
                        />}
                    />

                    <Route path="/profile"
                        element={<Profile
                            onUpdateProfile={handleUpdateProfile}
                            signOut={signOut}
                            serverError={serverError}
                            setServerError={setServerError}
                            isLoading={isLoading}
                            setIsEditing={setIsEditing}
                            isEditing={isEditing}
                        />}
                    />

                    <Route path="*"
                        element={<NotFound
                        />}
                    />

                </Routes>
                <InfoToolTipSuccess
                    isOpen={isToolTipSuccessOpen}
                    onClose={closeAllPopups}
                />
                <InfoToolTipFail
                    isOpen={isToolTipFailOpen}
                    onClose={closeAllPopups}
                    serverError={serverError}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;