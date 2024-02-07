import React from 'react';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from '../Header/Header.js';
import Footer from "../Footer/Footer.js";
import { useState } from 'react';
import Preloader from '../Preloader/Preloader.js';

function Movies({ cards, isLoading, isRemovable }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);

  const searchResults = () => {
    if(searchQuery === '') {
      return (
        <h3>Ничего не найдено</h3>
      )
    }
    return (
      <MoviesCardList
              searchQuery={searchQuery}
              cards={cards}
              isRemovable={isRemovable}
              onlyShortMovies={onlyShortMovies}
            />
    )
  }

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
            {isLoading ? <Preloader /> : searchResults() }
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;