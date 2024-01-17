import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

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
    const [loggedIn, setLoggedIn] = useState(false);
    // const [email, setEmail] = useState(currentUser?.email);
   const navigate = useNavigate();
    const api = new MainApi();

    console.log("currentUser", currentUser);

    useEffect(() => {
        checkContent();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then(user => {
                    setCurrentUser(user);
                    console.log("user", user);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    function handleLogin(email, password) { 
        api.authorize(email, password) 
            .then(res => { 
                // localStorage.setItem('jwt', res.token); 
                Cookies.set('jwt', res.token); 
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
        // const token = Cookies.get('jwt');
        // console.log(token);
        // const token = localStorage.getItem('jwt');
        // console.log(token);

        // if (token) {
            api.checkToken()
                .then((res) => {
                    console.log('Тест перед сеттерами');
                    setCurrentUser(res);
                    setLoggedIn(true);
                    // navigate("/"); 
                })
                .catch(err => console.log(err));
        // }
    }

    function signOut() { 
        api.signOut()
          .then(() => { 
            setCurrentUser(null); 
            setLoggedIn(false); 
          }) 
          .catch(err => console.log(err)); 
          console.log("signout1"); 

      }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/signin" element={<Login
                            setCurrentUser={setCurrentUser}
                            onLogin={handleLogin}
                            
                        />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/saved-movies" element={<SavedMovies />} />
                        <Route
                            path="/profile"
                            element={<Profile
                                setCurrentUser={setCurrentUser}
                                onUpdateProfile={handleUpdateProfile}
                                signOut={signOut}
                                loggedIn={loggedIn}
                            />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;