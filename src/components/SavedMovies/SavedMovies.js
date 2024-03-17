import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import MoviesApi from "../../utils/MoviesApi.js";

function SavedMovies({
  getAllMovies,
  savedMovies,
  serverMessage,
  setServerMessage,
  setSavedMovies,
}) {
  const moviesApi = new MoviesApi();
  const [filteredMovies, setFilteredMovies] = useState(savedMovies || "");
  const [savedSearchQuery, setSavedSearchQuery] = useState("");
  const likedMovies = JSON.parse(localStorage.getItem("likedMovies"));

  useEffect(() => {
    moviesApi.getSavedMovies().then((savedMovies) => {
      setSavedMovies(savedMovies);
      setFilteredMovies(savedMovies);
      setServerMessage("");
      localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
      console.log("likedMovies", likedMovies);
      console.log("savedMovies", savedMovies);
      console.log("filteredMovies", filteredMovies);
    });
  }, []);

 

  const handleDelete = (movieId) => {
    console.log('DELETE');

    const movieToDelete = likedMovies.find((movie) => movie.id === movieId);

    return moviesApi
      .deleteMovie(movieToDelete._id)
      .then(() => {
        console.log('DELETE');
        const storedLikedMovies = JSON.parse(
          localStorage.getItem("likedMovies")
        );
        const updatedSavedMovies = storedLikedMovies.filter(
          (movie) => movie.id !== movieId
        );
        localStorage.setItem("likedMovies", JSON.stringify(updatedSavedMovies));
        const updatedFilteredMovies = filteredMovies.filter(
          (movie) => movie.id !== movieId
        );
        setSavedMovies(updatedSavedMovies);
        console.log("savedMovies", savedMovies);
        setFilteredMovies(updatedFilteredMovies);
         console.log("filteredMovies", filteredMovies);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  const handleFilteredMovies = (savedMovies) => {
    setFilteredMovies(savedMovies);
  };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="saved-movies">
        <section className="saved-movies-page">
          <SearchForm
            cards={savedMovies}
            likedMovies={likedMovies}
            handleSearch={handleFilteredMovies}
            getAllMovies={getAllMovies}
            isSaved={true}
            savedSearchQuery={savedSearchQuery}
            setSavedSearchQuery={setSavedSearchQuery}
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
          />
          <MoviesCardList
            cards={filteredMovies}
            isSaved={true}
            serverMessage={serverMessage}
            handleDelete={handleDelete}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
