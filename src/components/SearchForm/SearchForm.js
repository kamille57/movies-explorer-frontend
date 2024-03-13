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
}) {
  const [savedSearchQuery, setSavedSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("moviesSearchQuery")
  );
  const [onlyShortMovies, setOnlyShortMovies] = useState(
    localStorage.getItem(
      isSaved ? "savedOnlyShortMovies" : "moviesOnlyShortMovies"
    ) === "true" || false
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
    console.log(cards);
    if (isSaved) {
      console.log('cards filtered', cards);
        const regex = new RegExp(savedSearchQuery, "gi");
        let filtered = cards.filter((card) => card.nameRU.match(regex));

        if (onlyShortMovies) {
            filtered = filtered.filter((card) => card.duration <= SHORT_MOVIES_DURATION);
            console.log(filtered);

        }

      handleSearch(filtered);
    } else if (!isSaved && searchQuery) {
      console.log("cards filtered", cards);

      const regex = new RegExp(searchQuery, "gi");
      let filtered = cards.filter((card) => card.nameRU.match(regex));
      if (onlyShortMovies) {
        console.log("короткометражки");

        filtered = filtered.filter(
          (card) => card.duration <= SHORT_MOVIES_DURATION
        );
      }

      handleSearch(filtered);

      if (!isSaved) {
        console.log("сеттим серчквери");
        localStorage.setItem("moviesSearchQuery", searchQuery);
      } else {
        setSavedSearchQuery(savedSearchQuery);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cards && !searchQuery) {
      // в этом варианте при первом входе отрабатывает правильно
      console.warn("Вы передаёте пустые фильмы, вам надо скачать их");
      setServerMessage("Вам нужно ввести ключевое слово");
      localStorage.setItem("moviesSearchQuery", "");

      return;
    }

    if (!cards && searchQuery) {
      console.log(" ФИЛЬМЫ ЗАГРУЖЕНЫ");
      localStorage.setItem("moviesSearchQuery", searchQuery);
      getAllMovies();
      return;
    }
    if (searchQuery === null && !isSaved) {
      console.log("я тут");
      setServerMessage("Вам нужно ввести ключевое слово");
      return;
    }
    if (searchQuery.trim() === "" && !isSaved) {
      console.log("я тут");
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
    console.log("Карточки поменялись");
    if (!cards || cards.length === 0) {
      return;
    }
    
      handleFilteredResults();
      console.log("проходим");
    
  }, [onlyShortMovies]);

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фильм"
          className={`search-input ${serverMessage && "search-input_error"}`}
          value={isSaved ? savedSearchQuery : searchQuery}
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
