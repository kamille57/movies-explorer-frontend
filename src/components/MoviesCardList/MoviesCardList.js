import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import MoviesCard from "../MoviesCard/MoviesCard.js";
import { VISIBLE_MOVIES } from "../../constants/constants.js";

function MoviesCardList({
  cards,
  handleLike,
  handleDelete,
  isSaved,
  savedSearchQuery,
}) {
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  const [chunkSize, setChunkSize] = useState(2); // 2 - 2 - 4
  const [cardsLimit, setCardsLimit] = useState(5); // 5 - 8 - 16
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchQuery = localStorage.getItem("moviesSearchQuery");

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
    if (windowWidth >= 1280) {
      changeMovieListOptions(VISIBLE_MOVIES.LARGE, 4);
    } else if (windowWidth >= 768) {
      changeMovieListOptions(VISIBLE_MOVIES.SMALL, 2);
    } else {
      changeMovieListOptions(VISIBLE_MOVIES.EXTRA_SMALL, 2);
    }
  }, [windowWidth]);

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
      {console.log(cards)}
      {(searchQuery === '' && !isSaved) ||
      (!isSaved && cards.length === 0 && searchQuery) ||
      (savedSearchQuery === "" && cards.length === 0) ? (
        <h3 className="movies__empty-request">Ничего не найдено</h3>
      ) : (!cards && !searchQuery && !isSaved) || (!isSaved && !searchQuery) ? (
        <div className="movies__empty-request"></div>
      ) : (
        <section className="cards">
          <ul className="cards__container">
            {cards &&
              cards.slice(0, cardsLimit).map((newCard) => (
                <li key={uuidv4()}>
                  <MoviesCard
                    card={newCard}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    isSaved={isSaved}
                  />
                </li>
              ))}
          </ul>
          {cards.length > cardsLimit && (
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
