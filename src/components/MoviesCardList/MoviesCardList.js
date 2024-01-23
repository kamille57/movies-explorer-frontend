import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ cards, searchQuery }) {

  // Зачем мне movies?

  const [movies, setMovies] = useState(cards);

  

  // useEffect(() => {
  //   function handleResize() {
  //     const windowWidth = window.innerWidth;
  //     if (windowWidth >= 320 && windowWidth <= 620) {
  //       setCards(new Array(5).fill(null));
  //     } else if (windowWidth >= 621 && windowWidth <= 920) {
  //       setCards(new Array(8).fill(null));
  //     } else {
  //       setCards(new Array(16).fill(null));
  //     }
  //   }

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Вызываем функцию при монтировании компонента

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {   
    const regex = new RegExp(searchQuery, 'g');
    // TODO: доделать поиск чтобы он поддерживал английские символы
    // 1. УЗнать как работает фильтр
    // 2. Определить язык ввода
    // 3. Дальнейшие шаги написать самостоятельно
    const filterdMovies = cards.filter(movie => movie.nameRU.match(regex));
    setMovies(filterdMovies);
    console.log(filterdMovies);
  }, [searchQuery, cards]);

  console.log('searchQuery', searchQuery);

  return (
    <section className="cards">
      <ul className="cards__container">
        {searchQuery !== '' && movies && movies.map((card) => (
          <li key={card.id}>
            <MoviesCard
              card={card}
            />
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
