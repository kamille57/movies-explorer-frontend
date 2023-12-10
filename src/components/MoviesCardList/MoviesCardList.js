import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 320 && windowWidth <= 620) {
        setCards(new Array(5).fill(null));
      } else if (windowWidth >= 621 && windowWidth <= 920) {
        setCards(new Array(8).fill(null));
      } else {
        setCards(new Array(16).fill(null));
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Вызываем функцию при монтировании компонента

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="cards">
      <ul className="cards__container">
        {cards.map((_card, index) =>(
          <li key={index}>
            <MoviesCard card={_card} index={index} />
          </li>
        ))}
      </ul>
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