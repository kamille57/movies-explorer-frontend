import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ cards, handleSearch, isSaved, getAllMovies }) {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("moviesSearchQuery") || ""
  );
  const [onlyShortMovies, setOnlyShortMovies] = useState(
    localStorage.getItem(
      isSaved ? "savedOnlyShortMovies" : "moviesOnlyShortMovies"
    ) === "true" || false
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilteredResults = async () => {
    console.log("handleFilteredResults");
    if (cards.length === 0 && !isSaved) {
      console.warn("Вы передаёте пустые фильмы, вам надо скачать их");
      localStorage.setItem("moviesSearchQuery", searchQuery);
      await getAllMovies();
      return;
    }

    console.log(cards);
    const regex = new RegExp(searchQuery, "gi");
    let filtered = cards.filter((card) => card.nameRU.match(regex));

    if (onlyShortMovies) {
      filtered = filtered.filter((card) => card.duration <= 40);
    }

    handleSearch(filtered);

    if (!isSaved) {
      localStorage.setItem("moviesSearchQuery", searchQuery);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      console.log('я тут');
      setErrorMessage("Нужно ввести ключевое слово");
      return;
    }
    try {
      handleFilteredResults(searchQuery);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching movies from the server", error);
      setErrorMessage("Ошибка при поиске фильмов");
    }
  };

  useEffect(() => {
    console.log("Карточки поменялись");
    console.log(cards.length);
    if (cards.length === 0) {
      return;
    }
    if (searchQuery) {
      handleFilteredResults();
    }
  }, [cards, onlyShortMovies]);

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className={`search-input ${errorMessage && "search-input_error"}`}
          value={isSaved ? "" : searchQuery}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="search__btn"
          aria-label="Кнопка запроса"
        ></button>
      </form>
      <span className={`search__error-message ${errorMessage && "search__error-message_active"}`} 
>{errorMessage}</span> 

      <FilterCheckbox
        setOnlyShortMovies={setOnlyShortMovies}
        onlyShortMovies={onlyShortMovies}
        isSaved={isSaved}
      />
    </section>
  );
}

export default SearchForm;

// import React, { useState, useEffect } from "react";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
// import MoviesApi from "../../utils/MoviesApi.js";

// function SearchForm({ cards, handleSearch, isSaved }) {
//   const [movies, setMovies] = useState([]);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(
//     () => localStorage.getItem("moviesSearchQuery") || ""
//   );

//   const [onlyShortMovies, setOnlyShortMovies] = useState(
//     localStorage.getItem(
//       isSaved ? "savedOnlyShortMovies" : "moviesOnlyShortMovies"
//     ) === "true" || false
//   );

//   const moviesApi = new MoviesApi();

//   // useEffect(() => {
//   //   handleFilteredResults(searchQuery);
//   // }, [onlyShortMovies, isSaved]);

//   const handleChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

// const handleFilteredResults = (searchQuery) => {
//   const regex = new RegExp(searchQuery, "gi");
//   let filtered = cards.filter((card) => card.nameRU.match(regex));

//   if (onlyShortMovies) {
//     filtered = filtered.filter((card) => card.duration <= 40);
//   }

//   handleSearch(filtered);
//   if (!isSaved) {
//     localStorage.setItem("moviesSearchQuery", searchQuery);
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // handleFilteredResults(searchQuery);

//     try {
//       const initialMovies = await moviesApi.getInitialMovies();
//       setMovies(initialMovies);

//       const savedMovies = await moviesApi.getSavedMovies();
//       setSavedMovies(savedMovies);

//       localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
//       console.log('получили фильмы');
//     } catch (error) {
//       console.error("Error fetching movies from the server", error);
//     }
//   };

//   return (
//     <section className="search">
//       <form className="search__container" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Фильм"
//           className="search-input"
//           value={searchQuery}
//           onChange={handleChange}
//         />
//         <button
//           type="submit"
//           className="search__btn"
//           aria-label="Кнопка запроса"
//         ></button>
//       </form>
//       <FilterCheckbox
//         setOnlyShortMovies={setOnlyShortMovies}
//         onlyShortMovies={onlyShortMovies}
//         isSaved={isSaved}
//       />
//     </section>
//   );
// }

// export default SearchForm;
