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


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setMovies] = useState([]);
    const [isToolTipSuccessOpen, setIsToolTipSuccessOpen] = useState(false);
    const [isToolTipFailOpen, setIsToolTipFailOpen] = useState(false);

    const navigate = useNavigate();
    const api = new MainApi();
    const moviesApi = new MoviesApi();

    // useEffect(() => { 
    //     const token = localStorage.getItem('jwt'); 
    //     if (token) { 
    //         setIsLoading(false); 
    //         setIsLoggedIn(true); 

    //         Promise.all([ 
    //             api.getUserInfo(token), 
    //             moviesApi.getInitialMovies(), 
    //         ]) 
    //             .then(([userData, initialMovies]) => { 
    //                 console.log('Login удался, логиним вас'); 
    //                 setIsLoggedIn(true); 
 
    //                 setCurrentUser(userData); 
    //                 setMovies(initialMovies); 
    //                 console.log(isLoggedIn); 
    //                 console.log(isLoading); 
    //             }) 
    //             .catch((err) => { 
    //                 console.log('Ошибка при получении данных пользователя:', err); 
    //                 localStorage.removeItem('jwt'); 
    //                 setIsLoggedIn(false); 
    //                 setCurrentUser(null); 
    //                 setIsLoading(false); 
    //             }); 
    //     } else { 
    //         console.log('Ушли в елсе'); 
    //         setIsLoggedIn(false); 
    //         setCurrentUser(null); 
    //     } 
    // }, []);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {

                try {
                    const userData = await api.getUserInfo(token);
                    setCurrentUser(userData);
                    const initialMovies = await moviesApi.getInitialMovies();
                    setMovies(initialMovies);
                    setIsLoggedIn(true);
                    console.log("LOGIN", isLoggedIn);


                } catch (err) {
                    console.log('Ошибка при получении данных пользователя:', err);
                    localStorage.removeItem('jwt');
                    setIsLoggedIn(false);
                    setCurrentUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setCurrentUser(null);
            }
        };
        
        checkToken().finally(() => setIsLoading(false));
    }, []);
    console.log("currentUser", currentUser);

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

    // function handleLogin(email, password) {
    //     setIsLoading(true);
    //     console.log("isLoading from login", isLoading);
    //     console.log("isLoggedIn from login", isLoggedIn);

    //     api.authorize(email, password)
    //         .then(res => {
    //             localStorage.setItem('jwt', res.token);
    //             setIsLoggedIn(true);
    //             checkContent();
    //             navigate("/");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //         .finally(() => setIsLoading(false));
    //     ;
    // }

    const handleLogin = async (password, email) => {
        setIsLoading(true);
        try {
            const authData = await api.authorize(password, email);
            localStorage.setItem('jwt', authData.token);
            const userData = await api.getUserInfo(authData.token);
            setCurrentUser(userData);
            setIsLoggedIn(true);
            navigate('/');
            // setTooltipTitle('С возвращением!');
            // setTooltipIcon('success');
            // setIsInfoTooltipPopupOpen(true);
        } catch (err) {
            console.log('Ошибка при получении данных пользователя:', err);
        } finally {
            setIsLoading(false);
        }
    };

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

    // function checkContent() {
    //     api.getUserInfo()
    //         .then((res) => {
    //             setCurrentUser(res);
    //             setIsLoggedIn(true);
    //         })
    //         .catch(err => console.log(err));
    // }

    function handleRegister({ name, email, password }) {
        setIsLoading(true)
        api.register({ name, email, password })
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setCurrentUser({ email, name });
                setIsLoggedIn(true);
                //setIsLoading(false);
                navigate("/");
                onRegister();
            })
            .catch(err => {
                onError();
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
            {isLoading && <Preloader />}
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
                    {/* <Route path='/signup' element={loggedIn ? <Navigate to="/" /> : <Register
                            onRegister={handleRegister}
                            errorMessage={serverError}
                            isPreloading={isPreloading}
                        />}
                        />
                        <Route path='/signin' element={loggedIn ? <Navigate to="/" /> : <Login
                            onLogin={handleLogin}
                            errorMessage={serverError}
                            isPreloading={isPreloading}
                        />} */}
                    {console.log('isLoading before MOVIES', isLoading)}
                    {console.log('IsLoggedIn before MOVIES', isLoggedIn)}

                    <Route
                        path="/movies"
                        element={<ProtectedRoute
                            Element={Movies}
                            cards={cards}
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                        />}
                    />
                    {console.log('isLoading after MOVIES', isLoading)}
                    {console.log('currentUs', currentUser)}

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