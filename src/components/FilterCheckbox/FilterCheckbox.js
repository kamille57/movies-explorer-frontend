import React from "react";

function FilterCheckbox({ setOnlyShortMovies, onlyShortMovies, isSaved, setSavedOnlyShortMovies, savedOnlyShortMovies }) {
  const handleCheckboxChange = () => {
    if (!isSaved) {
      localStorage.setItem("moviesOnlyShortMovies", !onlyShortMovies);
    } else {
      setSavedOnlyShortMovies(!savedOnlyShortMovies);
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
            checked={!isSaved ? onlyShortMovies : savedOnlyShortMovies}
            onChange={handleCheckboxChange}
          />
          <span className="filter-checkbox__inner"></span> Короткометражки
        </label>
      </form>
    </section>
  );
}

export default FilterCheckbox;
