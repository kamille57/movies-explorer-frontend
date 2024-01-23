import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ setSearchQuery, searchQuery }) { 

  return ( 
    <section className="search"> 
      <form className="search__container"> 
        <input 
          type="text" 
          placeholder="Фильм" 
          className="search-input" 
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          required  
        /> 
        <button type="button" className="search__btn" aria-label="Кнопка запроса"></button> 
      </form> 
      <FilterCheckbox /> 
    </section> 
  ); 
} 

export default SearchForm;