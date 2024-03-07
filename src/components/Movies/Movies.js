import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";

function Movies({ cards, handleLike, handleDelete, isLoading }) {
  const [filteredMovies, setFilteredMovies] = useState(cards);

  const handleFilteredMovies = (filteredCards) => {
    setFilteredMovies(filteredCards);
  };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="movies">
        <section className="movies-page">
          <SearchForm
            cards={cards}
            handleSearch={handleFilteredMovies}
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
