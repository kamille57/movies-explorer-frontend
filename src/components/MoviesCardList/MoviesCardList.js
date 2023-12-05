import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList() {
  const cardsSmallScreen = new Array(5).fill(null);
  const cardsMediumScreen = new Array(8).fill(null);
  const cardsLargeScreen = new Array(16).fill(null);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 320 && windowWidth <= 620) {
        setCards(cardsSmallScreen);
      } else if (windowWidth >= 621 && windowWidth <= 920) {
        setCards(cardsMediumScreen);
      } else {
        setCards(cardsLargeScreen);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Вызываем функцию при монтировании компонента

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cardsSmallScreen, cardsMediumScreen, cardsLargeScreen]);

  return (
    <section className="cards">
      <article className="cards__container">
        {cards.map((_card, index) => (
          <MoviesCard card={_card} key={index} />
        ))}
      </article>
      <button
        type="button"
        aria-label="кнопка для показа большего количества фильмов"
        className="cards__btn"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;