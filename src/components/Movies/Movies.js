import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";

function Movies({ isLoading, getAllMovies, movies, handleLike, handleDelete }) {

  const [filteredMovies, setFilteredMovies] = useState(movies);

  // эта функция возвращает отфильтрованные фильмы в Movies
  const handleFilteredMovies = (movies) => {
    setFilteredMovies(movies);
  };

console.log(movies);

 

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
              cards={filteredMovies}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
