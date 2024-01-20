import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import MainApi from '../../utils/MainApi.js'


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const api = new MainApi();

    console.log("currentUser", currentUser);

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = localStorage.getItem('jwt');
    //         if (token) {
    //             try {
    //                 const userData = await getContent(token);
    //                 setCurrentUser(userData);
    //                 setLoggedIn(true);
    //             } catch (err) {
    //                 const errorMessage = handleError(err, tokenCheckErrors);
    //                 setServerError(errorMessage);
    //                 localStorage.removeItem('jwt');
    //                 setLoggedIn(false);
    //                 setCurrentUser(null);
    //             }
    //         } else {
    //             setLoggedIn(false);
    //             setCurrentUser(null);
    //         }
    //     };
        
    //     checkToken().finally(() => setIsPreloading(false));
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            api.checkToken().then(result => {
                console.log('result', result);
                checkContent();
            })
        }
    }, []);

    function handleLogin(email, password) {
        api.authorize(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                checkContent();
                navigate("/"); // Add this line
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleUpdateProfile({ email, name }) {

        const updatedUser =
            { email, name }
            ;
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
    function handleRegister(name, email, password) {
        api.register(name, email, password)

        .then(res => {
            localStorage.setItem('jwt', res.token);
            console.log("handlereg");

                setCurrentUser({ email, name });
                navigate("/signin");
            })
            .catch(err => {
                console.log('Ошибка в функции регистрации', err);
            });
    }

    // async function handleRegister(name, email, password) {
    //     setIsPreloading(true);
    //     try {
    //         await register(name, email, password);
    //         const userAuth = await authorize(email, password);
    //         localStorage.setItem('jwt', userAuth.token);
    //         const userData = await getContent();
    //         setCurrentUser(userData);
    //         setLoggedIn(true);
    //         navigate('/movies');
    //         setTooltipTitle('Добро пожаловать!');
    //         setTooltipIcon('success');
    //         setIsInfoTooltipPopupOpen(true);
    //     } catch (err) {
    //         const errorMessage = handleError(err, registerErrors);
    //         setServerError(errorMessage);
    //     } finally {
    //         setIsPreloading(false);
    //     }
    // }

    function signOut() {
        api.signOut()
            .then(() => {
                console.log("signout2");
                localStorage.removeItem('jwt'); 
                setCurrentUser(null);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/signup" element={<Register onRegister={handleRegister} />} />
                    <Route path="/signin" element={<Login
                        setCurrentUser={setCurrentUser}
                        onLogin={handleLogin}
                    />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/saved-movies" element={<SavedMovies />} />
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