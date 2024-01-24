import { useState, useEffect } from 'react'; 
import MoviesCard from '../MoviesCard/MoviesCard.js'; 

function MoviesCardList({ cards, searchQuery, onlyShortMovies }) { 
  const [movies, setMovies] = useState(cards); 

  useEffect(() => {    
    const regex = new RegExp(searchQuery, 'gi'); 
    const filteredMovies = cards.filter(movie => movie.nameRU.match(regex)); 
    setMovies(filteredMovies); 
  }, [searchQuery, cards]); 
  
  const filterMovies = (movies) => { 
    if (onlyShortMovies) { 
      return movies.filter(movie => movie.duration <= 40); 
    } else { 
      return movies; 
    } 
  }

  const filteredMovies = filterMovies(movies);

  return ( 
    <section className="cards"> 
      <ul className="cards__container"> 
        {searchQuery !== '' && filteredMovies && filteredMovies.map((card) => ( 
          <li key={card.id}> 
            <MoviesCard 
              card={card} 
            /> 
          </li> 
        ))} 
      </ul> 
      <button 
        type="button" 
        aria-label="кнопка для показа большего количества фильмов" 
        className="cards__btn" 
      > 
        Ещё 
      </button> 
    </section> 
  ); 
} 

export default MoviesCardList; 