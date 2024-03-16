import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import MoviesApi from "../../utils/MoviesApi.js";

function SavedMovies({
  handleDelete,
  getAllMovies,
  savedMovies,
  serverMessage,
  setServerMessage,
  setSavedMovies,
}) {
  const moviesApi = new MoviesApi();
  const [filteredMovies, setFilteredMovies] = useState(savedMovies || "");
  const [savedSearchQuery, setSavedSearchQuery] = useState("");
  const likedMovies = localStorage.getItem("likedMovies");

  
  useEffect(() => {
    moviesApi.getSavedMovies().then((savedMovies) => {
      setSavedMovies(savedMovies);
      setFilteredMovies(savedMovies);
      setServerMessage("");
      localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
    });
  }, []);

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [likedMovies]);

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
            handleDelete={handleDelete}
            isSaved={true}
            serverMessage={serverMessage}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
