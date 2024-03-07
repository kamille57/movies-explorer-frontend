import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ cards, handleSearch, isSaved }) {
  const [searchQuery, setSearchQuery] = useState(
    () =>
      localStorage.getItem(
        isSaved ? "savedMoviesSearchQuery" : "moviesSearchQuery"
      ) || ""
  );
  const [onlyShortMovies, setOnlyShortMovies] = useState(
    localStorage.getItem(
      isSaved ? "savedOnlyShortMovies" : "moviesOnlyShortMovies"
    ) === "true" || false
  );

  useEffect(() => {
    handleFilteredResults(searchQuery);
  }, [onlyShortMovies, isSaved]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilteredResults = (searchQuery) => {
    const regex = new RegExp(searchQuery, "gi");
    let filtered = cards.filter((card) => card.nameRU.match(regex));

    if (onlyShortMovies) {
      filtered = filtered.filter((card) => card.duration <= 40);
    }

    handleSearch(filtered);
    localStorage.setItem(
      isSaved ? "savedMoviesSearchQuery" : "moviesSearchQuery",
      searchQuery
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilteredResults(searchQuery);
  };

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className="search-input"
          value={searchQuery}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="search__btn"
          aria-label="Кнопка запроса"
        ></button>
      </form>
      <FilterCheckbox
        setOnlyShortMovies={setOnlyShortMovies}
        onlyShortMovies={onlyShortMovies}
        isSaved={isSaved}
      />
    </section>
  );
}

export default SearchForm;
