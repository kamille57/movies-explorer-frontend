import React, { useState } from 'react'; 
import SearchForm from "../SearchForm/SearchForm.js"; 
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"; 
import Header from '../Header/Header.js'; 
import Footer from "../Footer/Footer.js"; 
import Preloader from '../Preloader/Preloader.js'; 

function Movies({ cards, handleLike, handleDelete }) { 
  const [filteredMovies, setFilteredMovies] = useState(cards); 

  const handleFilteredMovies = (filteredCards) => { 
    setFilteredMovies(filteredCards); 
  } 

   

  return ( 
    <> 
      <Header 
        backgroundColor="#202020" 
        iconColor="#313131" 
        isLoggedIn={true} 
      /> 
      <main className="movies"> 
        <section className="movies-page"> 
          <SearchForm 
            cards={cards} 
            handleSearch={handleFilteredMovies} 
          /> 
          <MoviesCardList 
            cards={filteredMovies}
            handleLike={handleLike} 
            handleDelete={handleDelete}
          /> 
        </section> 
      </main> 
      <Footer /> 
    </> 
  ); 
} 

export default Movies;

// function Movies({ cards, isLoading, isRemovable, renewCards, handleDelete, handleLike }) {
//   // console.log(cards);
//   // console.log('Movies re-rendered');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [onlyShortMovies, setOnlyShortMovies] = useState(false);
//   const [movies, setMovies] = useState([]);

//   // useEffect(()=>{
//   //   setMovies(cards)
//   // }, [cards])

//   useEffect(function () {
//     console.log('Movies - useEffect 1 - render');
//     const onlyShortMovies = localStorage.getItem('onlyShortMovies');
//     if (onlyShortMovies === "true") {
//       setOnlyShortMovies(true)
//     }
//     const moviesSearchQuery = localStorage.getItem('moviesSearchQuery');
//     if (moviesSearchQuery) setSearchQuery(moviesSearchQuery)
//   }, [])


//   useEffect(function () {
    
//     console.log('Movies - useEffect 2 - render');
//     setMovies([]);
//     localStorage.setItem('moviesSearchQuery', searchQuery);
//   }, [searchQuery, setSearchQuery])

//   const globalCardFilter = (e) => {
//     e.preventDefault();
//     console.log('globalCardFilter in MOVIES');
//     const fixedCards = cards.map(card => {
//       const imageUrl = typeof card.image === 'string'
//         ? card.image
//         : 'https://api.nomoreparties.co' + card.image.url;
//       const newCard = {
//         ...card,
//         image: imageUrl
//       };

//       return newCard;
//     });

//     console.log(fixedCards);

//     const regex = new RegExp(searchQuery, 'gi');
//     let filteredMovies = fixedCards.filter(movie => movie.nameRU.match(regex));

//     if (onlyShortMovies) {
//       filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
//     }

//     // filteredMovies = filteredMovies.map(function (movie) {
//     //   const findedSavedMovie = savedMovies.find(sm => sm.id === movie.id);
//     //   if (findedSavedMovie) {
//     //     movie.saved = true;
//     //     movie._id = findedSavedMovie._id;
//     //   }
      
//     //   return movie
//     // })

//     console.log(filteredMovies.slice(0,10));
//     setMovies(filteredMovies);
//   };

//   return (
//     <>
//       <Header
//         backgroundColor="#202020"
//         iconColor="#313131"
//         isLoggedIn={true}
//       />
//       <main className="movies">
//         <section className="movies-page">
//           <SearchForm
//             setSearchQuery={setSearchQuery}
//             searchQuery={searchQuery}
//             handleSubmit={globalCardFilter}
//             setOnlyShortMovies={setOnlyShortMovies}
//             onlyShortMovies={onlyShortMovies}
//           />
//             {console.log('Before moviesCardList', movies)}
//            {isLoading ? 
//             <Preloader /> 
//             : (movies.length > 0 && 
//               <MoviesCardList 
//                 searchQuery={searchQuery} 
//                 handleDelete={handleDelete}
//                 handleLike={handleLike}
//                 cards={movies} 
//                 isSaved={cards.saved} 
//                 renewCards={renewCards} 
//                 isRemovable={isRemovable} 
//                 onlyShortMovies={onlyShortMovies} 
//                 showMoviesWhileEmptySearch={false} 
//                 setMovies={setMovies}
//               />
//             ) 
//           } 
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default Movies;