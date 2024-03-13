import React from "react";

function FilterCheckbox({ setOnlyShortMovies, onlyShortMovies, isSaved }) {
  const handleCheckboxChange = () => {
    if (!isSaved) {
      localStorage.setItem("moviesOnlyShortMovies", !onlyShortMovies);
    } else {
      localStorage.setItem("savedOnlyShortMovies", !onlyShortMovies);

    }
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
