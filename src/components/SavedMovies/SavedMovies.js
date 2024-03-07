import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";

function SavedMovies({ savedCards, isLoading, handleDelete }) {
  const [filteredMovies, setFilteredMovies] = useState(savedCards);

  useEffect(() => {
    setFilteredMovies(savedCards);
  }, []);

  const updateSavedMovies = () => {
    setFilteredMovies(savedCards);
  };

  const handleFilteredMovies = (filteredCards) => {
    setFilteredMovies(filteredCards);
  };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="saved-movies">
        <section className="saved-movies-page">
          <SearchForm
            cards={savedCards}
            handleSearch={handleFilteredMovies}
            isSaved={true}
          />
          {isLoading && console.log(isLoading) ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={filteredMovies}
              handleDelete={handleDelete}
              isSaved={true}
              updateSavedMovies={updateSavedMovies}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
