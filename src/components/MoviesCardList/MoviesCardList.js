import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({
  cards,
  handleLike,
  handleDelete,
  isSaved,
  savedSearchQuery,
  serverMessage,
}) {
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  const [chunkSize, setChunkSize] = useState(2); // 2 - 2 - 4
  const [cardsLimit, setCardsLimit] = useState(5); // 5 - 8 - 16
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchQuery = localStorage.getItem("moviesSearchQuery");

  console.log("cards from MoviesCardList", cards);
  console.log("savedSearchQuery", savedSearchQuery);

  // useEffect(() => {
  //   if (!isSaved) {
  //     return;
  //   }
  // }, []);

  // useEffect(() => {
  //   if (searchQuery) {
  //     console.log("cards from MoviesCardList useEffect", cards);
  //     localStorage.setItem("moviesSearchQuery", searchQuery);
  //     return;
  //   }
  // }, []);

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
      changeMovieListOptions(16, 4);
    } else if (windowWidth >= 768) {
      changeMovieListOptions(8, 2);
    } else {
      changeMovieListOptions(5, 2);
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
      {(searchQuery === "" && cards.length !== 0 && !isSaved) ||
      (serverMessage) ||
      (cards.length === 0 && isSaved) ||
      (searchQuery && cards.length === 0) ||
      (savedSearchQuery === "" && cards.length === 0) ? (
        <h3 className="movies__empty-request">Ничего не найдено</h3>
      ) : (
        <section className="cards">
          <ul className="cards__container">
            {cards &&
              cards.slice(0, cardsLimit).map((newCard, index) => (
                <li key={index}>
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
