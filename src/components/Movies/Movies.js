import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesApi from "../../utils/MoviesApi.js";

function Movies({ isLoading, getAllMovies, movies, setMovies }) {
  const moviesApi = new MoviesApi();


  // эта функция возвращает отфильтрованные фильмы в Movies
  const handleFilteredMovies = (movies) => {
    setMovies(movies);
  };

console.log(movies);

  function handleLike(movie) {
    moviesApi
      .createMovie(movie)
      .then((newMovie) => {
        const likedMovies =
          JSON.parse(localStorage.getItem("likedmovies")) || [];
        const isLiked = likedMovies.some((item) => item.id === newMovie.id);

        if (!isLiked) {
          likedMovies.push(newMovie);
          localStorage.setItem("likedmovies", JSON.stringify(likedMovies));

          const savedMovies =
            JSON.parse(localStorage.getItem("savedmovies")) || [];
          savedMovies.push(newMovie);
          localStorage.setItem("savedmovies", JSON.stringify(savedMovies));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={movies}
              handleLike={handleLike}
              // handleDelete={handleDelete}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
