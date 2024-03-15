import React, { useState, useEffect } from "react";
import { SHORT_MOVIES_DURATION } from "../../constants/constants.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({
  cards,
  handleSearch,
  isSaved,
  getAllMovies,
  serverMessage,
  setServerMessage,
  isMoviesLoading,
}) {
  const initialMovies = localStorage.getItem("initialMovies");
  const [savedSearchQuery, setSavedSearchQuery] = useState("");
  const [savedOnlyShortMovies, setSavedOnlyShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("moviesSearchQuery")
  );
  const [onlyShortMovies, setOnlyShortMovies] = useState(
    localStorage.getItem("moviesOnlyShortMovies") === "true" || false
  );

  const handleChange = (e) => {
    if (!isSaved) {
      setSearchQuery(e.target.value);
    } else {
      setSavedSearchQuery(e.target.value);
    }
  };

  const handleFilteredResults = () => {
    setServerMessage("");
    if (isSaved) {
      const regex = new RegExp(savedSearchQuery, "gi");
      let filtered = cards.filter((card) => card.nameRU.match(regex));
      if (savedOnlyShortMovies) {
        filtered = filtered.filter(
          (card) => card.duration <= SHORT_MOVIES_DURATION
        );
      }
      handleSearch(filtered);
    } else if (!isSaved && searchQuery) {
      const regex = new RegExp(searchQuery, "gi");
      let filtered = cards.filter((card) => card.nameRU.match(regex));
      if (onlyShortMovies) {
        filtered = filtered.filter(
          (card) => card.duration <= SHORT_MOVIES_DURATION
        );
      }

      handleSearch(filtered);

      if (!isSaved) {
        localStorage.setItem("moviesSearchQuery", searchQuery);
      } else {
        setSavedSearchQuery(savedSearchQuery);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cards && !searchQuery) {
      console.warn("Вы передаёте пустые фильмы, вам надо скачать их");
      setServerMessage("Вам нужно ввести ключевое слово");
      localStorage.setItem("moviesSearchQuery", "");

      return;
    }

    if (!cards && searchQuery) {
      localStorage.setItem("moviesSearchQuery", searchQuery);
      await getAllMovies();

      return;
    }

    if (searchQuery === null && !isSaved) {
      setServerMessage("Вам нужно ввести ключевое слово");
      return;
    }

    if (searchQuery.trim() === "" && !isSaved) {
      setServerMessage("Вам нужно ввести ключевое слово");
      localStorage.setItem("moviesSearchQuery", "");

      return;
    }

    if (isSaved && savedSearchQuery.trim() === "") {
      setServerMessage("Вам нужно ввести ключевое слово");

      return;
    }

    try {
      setServerMessage("");
      if (isSaved) {
        handleFilteredResults(savedSearchQuery);
      } else {
        handleFilteredResults(searchQuery);
      }
    } catch (error) {
      console.error("Error fetching movies from the server", error);
      setServerMessage("Ошибка при поиске фильмов");
    }
  };

  useEffect(() => {
    if (!cards || cards.length === 0 || isMoviesLoading) {
      return;
    }
      handleFilteredResults();
  }, [onlyShortMovies, initialMovies]);

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className={`search-input ${serverMessage && "search-input_error"}`}
          value={isSaved ? savedSearchQuery || "" : searchQuery || ""}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="search__btn"
          aria-label="Кнопка запроса"
        ></button>
      </form>
      <span
        className={`search__error-message ${
          serverMessage && "search__error-message_active"
        }`}
      >
        {serverMessage}
      </span>

      <FilterCheckbox
        setOnlyShortMovies={setOnlyShortMovies}
        onlyShortMovies={onlyShortMovies}
        setSavedOnlyShortMovies={setSavedOnlyShortMovies}
        savedOnlyShortMovies={savedOnlyShortMovies}
        isSaved={isSaved}
      />
    </section>
  );
}

export default SearchForm;
