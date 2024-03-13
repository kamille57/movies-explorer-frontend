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

  useEffect(() => {
    // при первом входе добавили на страницу список сохраненных фильмов
    moviesApi.getSavedMovies().then((savedMovies) => {
      console.log("Я в savedMovies", savedMovies);
      setSavedMovies(savedMovies);
      setServerMessage("");
      localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
    });
  }, []);

  // useEffect(() => {
  //   // если в savedMovies приходит аустой массив из отфильтрованных фильмов
  //   setSavedMovies(filteredMovies);
  // }, [filteredMovies]);

  const handleFilteredMovies = (savedMovies) => {
    console.log(savedMovies);
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
          {console.log("savedMovies", savedMovies)}
          <MoviesCardList
            cards={filteredMovies}
            handleDelete={handleDelete}
            isSaved={true}
            savedSearchQuery={savedSearchQuery}
            serverMessage={serverMessage}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
