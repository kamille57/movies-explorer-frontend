import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ cards, searchQuery, onlyShortMovies, isRemovable }) {
  const [movies, setMovies] = useState(cards);
  const [chunkSize, setChunkSize] = useState(4);
  const [cardsLimit, setCardsLimit] = useState(chunkSize);
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
    console.log('onlyShortMovies', onlyShortMovies);

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
      console.log('inside if');
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
    }

    console.log('Итоговый набор длина: ' + filteredMovies.length);



    setMovies(filteredMovies);
  }, [searchQuery, cards]);

  useEffect(() => {
    console.log('Width: ' + windowWidth);

    if (windowWidth >= 768) {
      setChunkSize(8);
    } else {
      setChunkSize(4);
    }
    setCardsLimit(8)

  }, [windowWidth]);


  const loadMoreBtn = () => {
    if (movies.length > cardsLimit) {
      return (
        <button
          type="button"
          aria-label="кнопка для показа большего количества фильмов"
          className="cards__btn"
        >
          Ещё
        </button>
      )
    }

  }

  return (
    <section className="cards">
      <ul className="cards__container">
        {searchQuery !== '' && movies && movies.slice(0, cardsLimit).map((newCard) => (
          <li key={newCard.id}>
            <MoviesCard
              card={newCard}
              isRemovable={isRemovable}
            />
          </li>
        ))}
      </ul>
      {loadMoreBtn()}
    </section>
  );
}

export default MoviesCardList; 