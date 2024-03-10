import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({
  cards,
  handleLike,
  handleDelete,
  isSaved,
  updateSavedMovies,
}) {
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  const [chunkSize, setChunkSize] = useState(2); // 2 - 2 - 4
  const [cardsLimit, setCardsLimit] = useState(5); // 5 - 8 - 16
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchQuery = localStorage.getItem("moviesSearchQuery");
  const isSearchQueryPresent = searchQuery !== null;
  console.log(cards);
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
      {searchQuery === '' || (searchQuery === null && cards.length !== 0 && !isSaved) ? (
        <h3 className="movies__empty-request">Ничего не найдено</h3>
      ) : (searchQuery === null && cards.length === 0) ? (
        <div className="movies__empty-request"></div>
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
                    updateSavedMovies={updateSavedMovies}
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
