import React, { useState, useEffect } from 'react';  
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";  
 
function SearchForm({ cards, handleSearch }) {  
  const [searchQuery, setSearchQuery] = useState("");  

  useEffect(() => { 
    const lastSearchQuery = localStorage.getItem('searchQuery'); 
    if (lastSearchQuery) { 
      setSearchQuery(lastSearchQuery); 
    } 
  }, []);

  useEffect(() => {
    if (localStorage.getItem('searchQuery')) {
      handleFilteredResults(localStorage.getItem('searchQuery'));
    }
  }, []);
 
  const handleChange = (e) => {  
    setSearchQuery(e.target.value);  
  }  
 
  const handleFilteredResults = (searchQuery) => {     
    const regex = new RegExp(searchQuery, 'gi');     
    const filtered = cards.filter(card => card.nameRU.match(regex));     
    handleSearch(filtered);     
    localStorage.setItem('searchQuery', searchQuery);     
  }  
 
  const handleSubmit = (e) => {  
    e.preventDefault();  
    handleFilteredResults(searchQuery); 
  }  
 
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
        <button type="submit" className="search__btn" aria-label="Кнопка запроса"></button>  
      </form>  
      <FilterCheckbox />  
    </section>  
  );  
}  
 
export default SearchForm;




// import React from 'react';
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

// function SearchForm({ setSearchQuery, handleSubmit, searchQuery, setOnlyShortMovies, onlyShortMovies }) {
//   return (
//     <section className="search">
//       <form className="search__container" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Фильм"
//           className="search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           required
//         />
//         <button type="submit" className="search__btn" aria-label="Кнопка запроса"></button>
//       </form>
//       <FilterCheckbox
//         setOnlyShortMovies={setOnlyShortMovies}
//         onlyShortMovies={onlyShortMovies}
//       />
//     </section>
//   );
// }

// export default SearchForm;