import React from 'react';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from '../Header/Header.js';
import Footer from "../Footer/Footer.js";
import { useState } from 'react';
import Preloader from '../Preloader/Preloader.js';

function Movies({ cards, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);

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
            {isLoading ? (
            <Preloader /> // Display a loading indicator if isLoading is true
          ) : (
            <MoviesCardList
              searchQuery={searchQuery}
              cards={cards}
              onlyShortMovies={onlyShortMovies}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;