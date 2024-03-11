import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesApi from "../../utils/MoviesApi.js";

function SavedMovies({ isLoading, handleDelete, getAllMovies, savedMovies, serverMessage, setServerMessage }) {
  const moviesApi = new MoviesApi();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedSearchQuery, setSavedSearchQuery] = useState("");

  useEffect(() => {
    moviesApi.getSavedMovies().then((savedMovies) => {
      console.log("Я в savedMovies", savedMovies);
      setFilteredMovies(savedMovies);
      localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
    });
  }, []);

  const handleFilteredMovies = (movies) => {
    console.log(movies);
    setFilteredMovies(movies);
  };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="saved-movies">
        <section className="saved-movies-page">
          <SearchForm
            cards={savedMovies}
            handleSearch={handleFilteredMovies}
            getAllMovies={getAllMovies}
            isSaved={true}
            savedSearchQuery={savedSearchQuery}
            setSavedSearchQuery={setSavedSearchQuery}
            serverMessage={serverMessage}
                setServerMessage={setServerMessage}
          />
          {isLoading && console.log(isLoading) ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={filteredMovies.length > 0 ? filteredMovies : savedMovies}
              handleDelete={handleDelete}
              isSaved={true}
              savedSearchQuery={savedSearchQuery}
              serverMessage={serverMessage}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
