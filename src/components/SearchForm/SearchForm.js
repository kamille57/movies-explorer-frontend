import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ setSearchQuery, handleSubmit, searchQuery, setOnlyShortMovies, onlyShortMovies }) {
  return (
    <section className="search">
      <form className="search__container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit" className="search__btn" aria-label="Кнопка запроса"></button>
      </form>
      <FilterCheckbox
        setOnlyShortMovies={setOnlyShortMovies}
        onlyShortMovies={onlyShortMovies}
      />
    </section>
  );
}

export default SearchForm;