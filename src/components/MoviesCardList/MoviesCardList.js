import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ cards, searchQuery, onlyShortMovies, isRemovable, showMoviesWhileEmptySearch, renewCards }) {
  const [movies, setMovies] = useState(cards);
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  const [chunkSize, setChunkSize] = useState(2); // 2 - 2 - 4
  const [cardsLimit, setCardsLimit] = useState(5); // 5 - 8 - 16
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
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

    setMovies(filteredMovies);
  }, [searchQuery, cards, onlyShortMovies]);

  useEffect(() => {
    if (windowWidth >= 1280) {
      changeMovieListOptions(16, 4);
    } else if (windowWidth >= 768) {
      changeMovieListOptions(8, 2);
    } else {
      changeMovieListOptions(5, 2);
    }

  }, [windowWidth]);

  function changeMovieListOptions(limit, chankSize) {
    !isLoadedMore && setCardsLimit(limit)
    setChunkSize(chankSize);
  }

  function addMoreItems() {
    const newLimit = cardsLimit + chunkSize;
    setCardsLimit(newLimit);
    if (!isLoadedMore) {
      setIsLoadedMore(true)
    }
  }

  return (
    (movies.length === 0 || (!showMoviesWhileEmptySearch && searchQuery === "")) ?
      <h3 className='movies__empty-request'>Ничего не найдено</h3>
      :
      <section className="cards">
        <ul className="cards__container">
          {movies && movies.slice(0, cardsLimit).map((newCard, index) => (
            <li key={index}>
              <MoviesCard
                card={newCard}
                isRemovable={isRemovable}
                isSaved={newCard.saved}
                renewCards={renewCards}
              />
            </li>
          ))}
        </ul>
        {movies.length > cardsLimit && (
          <button
            type="button"
            aria-label="кнопка для показа большего количества фильмов"
            className="cards__btn"
            onClick={addMoreItems}
          >
            Ещё
          </button>
        )}
      </section>
  );
}

export default MoviesCardList; 