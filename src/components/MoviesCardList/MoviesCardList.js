import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ cards }) {

  const [movies, setCards] = useState([]);

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
        {cards.map((card) => (
          <li /*key={card._id}*/>
            <MoviesCard
              card={cards}
            />
            {console.log(card)}
          </li>
        ))}
        {console.log(cards)}
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
