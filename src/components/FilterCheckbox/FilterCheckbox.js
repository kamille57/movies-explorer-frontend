import React from 'react';

function FilterCheckbox({ setOnlyShortMovies, onlyShortMovies }) {
  const handleCheckboxChange = () => {
    localStorage.setItem('onlyShortMovies', !onlyShortMovies)
    setOnlyShortMovies(!onlyShortMovies);
  };

  return (
    <section className="filter">
      <form>
        <label className="filter-checkbox" htmlFor="checkbox">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            id="checkbox"
            checked={onlyShortMovies}
            onChange={handleCheckboxChange}
          />
          <span className="filter-checkbox__inner"></span> Короткометражки
        </label>
      </form>
    </section>
  );
}

export default FilterCheckbox;