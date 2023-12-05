import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__container">
        <input type="search" placeholder="Фильм" className="search-input" />
        <button type="button" className="search__btn" aria-label="Кнопка запроса"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;