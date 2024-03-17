import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import {
  VISIBLE_MOVIES,
  WINDOW_WIDTH_THRESHOLD,
  FILMS_TO_LOAD_MORE,
} from "../../constants/constants.js";

function MoviesCardList({
  cards,
  isSaved,
  serverMessage,
  handleDelete,
}) {
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  const [chunkSize, setChunkSize] = useState(FILMS_TO_LOAD_MORE.SMALL_SCREEN); // 2 - 2 - 4
  const [cardsLimit, setCardsLimit] = useState(VISIBLE_MOVIES.EXTRA_SMALL); // 5 - 8 - 16
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchQuery = localStorage.getItem("moviesSearchQuery");
  const initialMovies = localStorage.getItem("initialMovies");
  const likedMovies = JSON.parse(localStorage.getItem("likedMovies"));
  
console.log("isSaved", isSaved);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= WINDOW_WIDTH_THRESHOLD.LARGE) {
      changeMovieListOptions(
        VISIBLE_MOVIES.LARGE,
        FILMS_TO_LOAD_MORE.FULL_SCREEN
      );
      setCardsLimit(VISIBLE_MOVIES.LARGE);
    } else if (windowWidth >= WINDOW_WIDTH_THRESHOLD.SMALL) {
      changeMovieListOptions(
        VISIBLE_MOVIES.SMALL,
        FILMS_TO_LOAD_MORE.SMALL_SCREEN
      );
      setCardsLimit(VISIBLE_MOVIES.SMALL);
    } else {
      changeMovieListOptions(
        VISIBLE_MOVIES.EXTRA_SMALL,
        FILMS_TO_LOAD_MORE.SMALL_SCREEN
      );
      setCardsLimit(VISIBLE_MOVIES.EXTRA_SMALL);
    }
  }, [windowWidth, searchQuery]);

  function changeMovieListOptions(limit, chunkSize) {
    if (!isLoadedMore) {
      setCardsLimit(limit);
    }
    setChunkSize(chunkSize);
  }

  function addMoreItems() {
    const newLimit = cardsLimit + chunkSize;
    setCardsLimit(newLimit);
    if (!isLoadedMore) {
      setIsLoadedMore(true);
    }
  }

  return (
    <>
      {(isSaved && (!likedMovies || likedMovies.length === 0) && initialMovies.length === 0)
      || (isSaved && likedMovies.length === 0 && initialMovies.length !== 0) ? (
        <h3 className="movies__empty-request"> Сохраненных фильмов нет.</h3> // При первом входе в сохраненные фильмы или когда сохраненных фильмов нет
      ) : (!isSaved && initialMovies.length === 0 && !serverMessage) ? (
        <div className="movies__empty-request"></div> // пустой экран только на странице MOVIES при первом входе
      ) : (serverMessage && cards.length === 0) || (!isSaved && cards.length === 0) || (!isSaved && (!searchQuery || searchQuery.length === 0)) ? (
        <h3 className="movies__empty-request">Ничего не найдено</h3> // ничего не найдено в случаях, когда пустая строка и ошибка валидации, когда cards.length === 0
      ) : cards.length === 0 && isSaved && initialMovies.length !== 0 ? (
        <h3 className="movies__empty-request"> Нет сохраненных фильмов, отвечающих условию поиска.</h3>
      ) : (
        <section className="cards">
          <ul className="cards__container">
            {isSaved
              ? cards.map((newCard) => (
                  <li key={newCard.id}>
                    <MoviesCard
                      card={newCard}
                      isSaved={isSaved}
                      handleDelete={handleDelete}
                    />
                  </li>
                ))
              : cards &&
                cards.slice(0, cardsLimit).map((newCard) => (
                  <li key={newCard.id}>
                    <MoviesCard
                      card={newCard}
                      isSaved={isSaved}
                      handleDelete={handleDelete}
                    />
                  </li>
                ))}
          </ul>
          {cards.length > cardsLimit && !isSaved && (
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
      )}
    </>
  );
}

export default MoviesCardList;
