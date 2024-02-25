import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from '../Header/Header.js';
import Footer from "../Footer/Footer.js";
import Preloader from '../Preloader/Preloader.js';

function Movies({ cards, savedMovies, isLoading, isRemovable, renewCards }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(function () {
    const onlyShortMovies = localStorage.getItem('onlyShortMovies');
    if (onlyShortMovies === "true") {
      setOnlyShortMovies(true)
    }
    const moviesSearchQuery = localStorage.getItem('moviesSearchQuery');
    if (moviesSearchQuery) setSearchQuery(moviesSearchQuery)
  }, [cards, savedMovies])


  useEffect(function () {
    setMovies([]);
    localStorage.setItem('moviesSearchQuery', searchQuery);
  }, [searchQuery, setSearchQuery])

  const globalCardFilter = (e) => {
    e.preventDefault();
    const fixedCards = cards.map(card => {
      const imageUrl = typeof card.image === 'string'
        ? card.image
        : 'https://api.nomoreparties.co' + card.image.url;
      const newCard = {
        ...card,
        image: imageUrl
      };

      return newCard;
    });

    const regex = new RegExp(searchQuery, 'gi');
    let filteredMovies = fixedCards.filter(movie => movie.nameRU.match(regex));

    if (onlyShortMovies) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
    }

    filteredMovies = filteredMovies.map(function (movie) {
      const findedSavedMovie = savedMovies.find(sm => sm.id === movie.id);
      if (findedSavedMovie) {
        movie.saved = true;
      }
      
      return movie
    })

    setMovies(filteredMovies);
  };

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
            handleSubmit={globalCardFilter}
            setOnlyShortMovies={setOnlyShortMovies}
            onlyShortMovies={onlyShortMovies}
          />
          {isLoading ?
            <Preloader />
            : <MoviesCardList
              searchQuery={searchQuery}
              cards={movies}
              isSaved={cards.saved}
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