import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from '../Header/Header.js';
import Footer from "../Footer/Footer.js";
import { useState } from 'react';
import Preloader from '../Preloader/Preloader.js';

function Movies({ cards, isLoading, isRemovable }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);

  useEffect(function() {
    const onlyShortMovies = localStorage.getItem('onlyShortMovies');
    if (onlyShortMovies === "true") {
      setOnlyShortMovies(true)
    } 
  }, [])

  return (
    <>
      <Header
        backgroundColor="#202020"
        iconColor="#313131"
        isLoggedIn={true}
      />
      <main className="movies">
        <section className="movies-page">
          <SearchForm
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            setOnlyShortMovies={setOnlyShortMovies}
            onlyShortMovies={onlyShortMovies}
          />
            {isLoading ? 
                <Preloader /> 
              : <MoviesCardList
                  searchQuery={searchQuery}
                  cards={cards}
                  isRemovable={isRemovable}
                  onlyShortMovies={onlyShortMovies}
                  showMoviesWhileEmptySearch={false}
                /> 
            }
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;