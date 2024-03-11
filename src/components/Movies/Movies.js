import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";

function Movies({
  isLoading,
  getAllMovies,
  handleLike,
  handleDelete,
  serverMessage,
  setServerMessage,
}) {

  const movies = JSON.parse(localStorage.getItem("initialMovies")); // здесь я получила массив из фильмов Movies
  console.log(movies);
  const [filteredMovies, setFilteredMovies] = useState(movies || '');

  useEffect(() => {
    console.log("Я в savedMovies");
    
    return;
  }, []);

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
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={filteredMovies}
              handleLike={handleLike}
              handleDelete={handleDelete}
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
