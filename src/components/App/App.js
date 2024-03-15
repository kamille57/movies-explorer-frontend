import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Auth from "../Auth/Auth.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import MainApi from "../../utils/MainApi.js";
import MoviesApi from "../../utils/MoviesApi.js";

import InfoToolTipSuccess from "../InfoToolTipSuccess/InfoToolTipSuccess.js";
import InfoToolTipFail from "../InfoToolTipFail/InfoToolTipFail.js";
import Preloader from "../Preloader/Preloader";
import { handleError } from "../../utils/handleError.js";
import {
  profileErrors,
  registerErrors,
  loginErrors,
  serverErrors,
  signOutErrors,
  likedMoviesErrors,
} from "../../constants/constants.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isToolTipSuccessOpen, setIsToolTipSuccessOpen] = useState(false);
  const [isToolTipFailOpen, setIsToolTipFailOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageSuccess, setServerMessageSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const [likedMovies, setLikedMovies] = useState([]);

  const navigate = useNavigate();
  const api = new MainApi();
  const moviesApi = new MoviesApi();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setIsLoggedIn(false);
        setIsCheckingAuth(false);
        return;
      }
      try {
        const userData = await api.getUserInfo(token);
        setCurrentUser(userData);

        setIsLoggedIn(true);
      } catch (err) {
        onError();
        const errorMessage = handleError(err, serverErrors);
        setServerMessage(errorMessage);

        localStorage.clear();
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

  function onSuccess() {
    setIsToolTipSuccessOpen(true);
  }

  function onError() {
    setIsToolTipFailOpen(true);
  }

  const getAllMovies = async () => {
    setIsMoviesLoading(true);

    try {
      const [initialMovies, savedMovies] = await Promise.all([
        moviesApi.getInitialMovies(),
        moviesApi.getSavedMovies(),
      ]);

      setMovies(initialMovies);
      setSavedMovies(savedMovies);

      localStorage.setItem("initialMovies", JSON.stringify(initialMovies));
      localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
    } catch (error) {
      console.error("Error fetching movies from the server", error);
    } finally {
      setIsMoviesLoading(false);
    }
  };

  const handleLike = (movie) => {
    return moviesApi
      .createMovie(movie)
      .then((newMovie) => {
        const updatedSavedMovies = [...savedMovies, newMovie];
        setSavedMovies(updatedSavedMovies);

        const updatedMovies = movies.map((m) =>
          m.id === newMovie.id ? newMovie : m
        );
        setMovies(updatedMovies);

        if (!likedMovies.find((m) => m._id === newMovie._id)) {
          const updatedLikedMovies = [...likedMovies, newMovie];
          setLikedMovies(updatedLikedMovies);

          localStorage.setItem(
            "likedMovies",
            JSON.stringify(updatedLikedMovies)
          );
        }
        return true;
      })

      .catch((error) => {
        onError();
        const errorMessage = handleError(error, likedMoviesErrors);
        setServerMessage(errorMessage);
        setIsEditing(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (movieId) => {
    const movieToDelete = savedMovies.find((movie) => movie.id === movieId);
    if (movieToDelete) {
      return moviesApi
        .deleteMovie(movieToDelete._id)
        .then(() => {
          const updatedLikedMovies = likedMovies.filter(
            (movie) => movie._id !== movieToDelete._id
          );
          setLikedMovies(updatedLikedMovies);

          localStorage.setItem(
            "likedMovies",
            JSON.stringify(updatedLikedMovies)
          );

          const updatedSavedMovies = savedMovies.filter(
            (movie) => movie.id !== movieId
          );
          setSavedMovies(updatedSavedMovies);
          return true;
        })
        .catch((error) => {
          onError();
          const errorMessage = handleError(error, likedMoviesErrors);
          setServerMessage(errorMessage);
          setIsEditing(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      return Promise.reject(false);
    }
  };

  function handleUpdateProfile({ email, name }) {
    setIsLoading(true);
    const updatedUser = { email, name };
    api
      .setUserInfo(updatedUser)
      .then(({ email, name }) => {
        setCurrentUser({ email, name });
        const successMessage = "Данные профиля успешно обновлены.";
        setServerMessageSuccess(successMessage);
        onSuccess();
      })
      .catch((error) => {
        onError();
        const errorMessage = handleError(error, profileErrors);
        setServerMessage(errorMessage);
        setIsEditing(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogin = ({ email, password }) => {
    api
      .authorize(email, password)
      .then((authData) => {
        localStorage.setItem("jwt", authData.token);
        setIsLoading(true);

        return api.getUserInfo(authData.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoading(true);
        console.log(isLoading);

        setIsLoggedIn(true);
        navigate("/movies");
        onSuccess();
        const successMessage = "Успешный вход в систему.";
        setServerMessageSuccess(successMessage);
      })
      .catch((err) => {
        onError();
        const errorMessage = handleError(err, loginErrors);
        setServerMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    api
      .register({ name, email, password })
      .then((res) => {
        return api.authorize(email, password);
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser({ email, name });
        setIsLoggedIn(true);
        navigate("/movies");
        onSuccess();
        const successMessage = "Вы успешно зарегистрировались!";
        setServerMessageSuccess(successMessage);
      })
      .catch((err) => {
        onError();
        const errorMessage = handleError(err, registerErrors);
        setServerMessage(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const signOut = () => {
    api
      .signOut()
      .then(() => {
        localStorage.clear();
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate("/");
        const successMessage = "До новых встреч!";
        setServerMessageSuccess(successMessage);
        onSuccess();
      })
      .catch((err) => {
        onError();
        const errorMessage = handleError(err, signOutErrors);
        setServerMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : isLoading ? (
                <Preloader />
              ) : (
                <Auth
                  onRegister={handleRegister}
                  isLoading={isLoading}
                  isRegistration={true}
                  serverMessage={serverMessage}
                  setServerMessage={setServerMessage}
                />
              )
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : isLoading ? (
                <Preloader />
              ) : (
                <Auth
                  onLogin={handleLogin}
                  setCurrentUser={setCurrentUser}
                  isLoading={isLoading}
                  isRegistration={false}
                  serverMessage={serverMessage}
                  setServerMessage={setServerMessage}
                />
              )
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                Element={Movies}
                isMoviesLoading={isMoviesLoading}
                isLoggedIn={isLoggedIn}
                getAllMovies={getAllMovies}
                handleLike={handleLike}
                handleDelete={handleDelete}
                serverMessage={serverMessage}
                setServerMessage={setServerMessage}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                Element={SavedMovies}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                getAllMovies={getAllMovies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                handleDelete={handleDelete}
                serverMessage={serverMessage}
                setServerMessage={setServerMessage}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                onUpdateProfile={handleUpdateProfile}
                signOut={signOut}
                setServerMessage={setServerMessage}
                serverMessage={serverMessage}
                isLoading={isLoading}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoToolTipSuccess
          isOpen={isToolTipSuccessOpen}
          onClose={closeAllPopups}
          serverMessageSuccess={serverMessageSuccess}
        />
        <InfoToolTipFail
          isOpen={isToolTipFailOpen}
          onClose={closeAllPopups}
          serverMessage={serverMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
