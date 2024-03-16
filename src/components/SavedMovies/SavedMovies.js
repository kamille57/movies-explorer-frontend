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
  // const [isOnCrossDeleted, setIsOnCrossDeleted] = useState(false);
  // const likedMovies = JSON.parse(localStorage.getItem("likedMovies"));

  
  useEffect(() => {
    moviesApi.getSavedMovies().then((savedMovies) => {
      setSavedMovies(savedMovies);
      setFilteredMovies(savedMovies);
      setServerMessage("");
      localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
    });
  }, []);

  // useEffect(() => {
  //   setFilteredMovies(likedMovies)
  //   setIsOnCrossDeleted(false)
  // }, [isOnCrossDeleted])
  console.log(filteredMovies);

  const handleFilteredMovies = (savedMovies) => {
    setFilteredMovies(savedMovies);
    console.log(filteredMovies);
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
            isSaved={true}
            serverMessage={serverMessage}
            // setIsOnCrossDeleted={setIsOnCrossDeleted}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
