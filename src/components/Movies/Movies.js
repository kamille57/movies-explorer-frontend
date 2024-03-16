import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";

function Movies({
  isMoviesLoading,
  getAllMovies,
  serverMessage,
  setServerMessage,
}) {

  let movies = [];
  
  if (localStorage.getItem("initialMovies")) {
    movies = JSON.parse(localStorage.getItem("initialMovies"));
  } else {
    movies = localStorage.setItem("initialMovies", '');
  }

  const [filteredMovies, setFilteredMovies] = useState(movies || '');

  // эта функция возвращает отфильтрованные фильмы в Movies
  const handleFilteredMovies = (movies) => {
    setFilteredMovies(movies);
  };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="movies">
        <section className="movies-page">
          <SearchForm
            cards={movies}
            handleSearch={handleFilteredMovies}
            getAllMovies={getAllMovies}
            isSaved={false}
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
            isMoviesLoading={isMoviesLoading}
          />
          {isMoviesLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={filteredMovies}
              serverMessage={serverMessage}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
