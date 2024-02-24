import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from '../Header/Header.js';
import Footer from "../Footer/Footer.js";
import { useState } from 'react';
import Preloader from '../Preloader/Preloader.js';

function Movies({ cards, savedMovies, isLoading, isRemovable,  renewCards }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);
  const [movies, setMovies] = useState(cards);

  useEffect(function() {
    const onlyShortMovies = localStorage.getItem('onlyShortMovies');
    if (onlyShortMovies === "true") {
      setOnlyShortMovies(true)
    } 
    const moviesSearchQuery = localStorage.getItem('moviesSearchQuery');
    if(moviesSearchQuery) setSearchQuery(moviesSearchQuery)


    // Даны два массива - найти в бОльшом элементы из меньшего и ЗАМЕНИТЬ
    const finalCards = cards.map(function(movie) {
      const findedSavedMovie = savedMovies.find(sm => sm.id === movie.id);
      if(findedSavedMovie){
        movie.saved = true;
      }
      return movie
    })
    setMovies(finalCards);

  }, [cards, savedMovies])


  useEffect(function() {
    localStorage.setItem('moviesSearchQuery', searchQuery);
  }, [searchQuery, setSearchQuery])

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
                  cards={movies}
                  renewCards={renewCards}
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