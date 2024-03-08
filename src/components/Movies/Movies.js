import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesApi from "../../utils/MoviesApi.js";

function Movies({ handleLike, handleDelete, isLoading }) {
  const [movies, setMovies] = useState([]);
  const moviesApi = new MoviesApi();

  const getInitialMovies = () => {
    moviesApi
      .getInitialMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 // эта функция возвращает отфильтрованные фильмы в Movies
  const handleFilteredMovies = (movies) => {
    setMovies(movies);
  };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="movies">
        <section className="movies-page">
          <SearchForm
            cards={movies}
            handleSearch={handleFilteredMovies}
            getInitialMovies={getInitialMovies}
            isSaved={false}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={movies}
              // handleLike={handleLike}
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
