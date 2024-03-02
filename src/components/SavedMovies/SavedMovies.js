import React from "react";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";

function SavedMovies({  savedCards }) {

    const [filteredMovies, setFilteredMovies] = useState(savedCards); 

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
      <main className="saved-movies">
        <section className="saved-movies-page">
          <SearchForm 
          cards={savedCards}
             handleSearch={handleFilteredMovies} />
          <MoviesCardList 
          cards={filteredMovies} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;




















// function SavedMovies({ cards, isLoading, isRemovable, currentUser, renewCards, handleDelete }) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [onlyShortMovies, setOnlyShortMovies] = useState(false);
//     const [movies, setSavedMovies] = useState(cards);

//     useEffect(function () {
//         const onlyShortMovies = localStorage.getItem('onlyShortMovies');
//         if (onlyShortMovies === "true") {
//             setOnlyShortMovies(true)
//         }
//         const moviesSearchQuery = localStorage.getItem('savedMoviesSearchQuery');
//         if (moviesSearchQuery) setSearchQuery(moviesSearchQuery)
//     }, [])

//     useEffect(function () {
//         localStorage.setItem('savedMoviesSearchQuery', searchQuery);
//     }, [searchQuery, setSearchQuery])

//     const globalCardFilter = (e) => {
//         e.preventDefault();
//         const fixedCards = cards.map(card => {
//             const imageUrl = typeof card.image === 'string'
//                 ? card.image
//                 : 'https://api.nomoreparties.co' + card.image.url;
//             const newCard = {
//                 ...card,
//                 image: imageUrl
//             };

//             return newCard;
//         });

//         const regex = new RegExp(searchQuery, 'gi');
//         let filteredMovies = fixedCards.filter(movie => movie.nameRU.match(regex));

//         if (onlyShortMovies) {
//             filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
//         }
//         setSavedMovies(filteredMovies);
//     };

 
//     return (
//         <>
//             <Header
//                 backgroundColor="#202020"
//                 iconColor="#313131"
//                 isLoggedIn={true}
//             />
//             <main className="saved-movies">
//                 <section className="saved-movies-page">
//                     <SearchForm
//                         setSearchQuery={setSearchQuery}
//                         searchQuery={searchQuery}
//                         handleSubmit={globalCardFilter}
//                         setOnlyShortMovies={setOnlyShortMovies}
//                         onlyShortMovies={onlyShortMovies}
//                     />
//                     {isLoading ?
//                         <Preloader />
//                         : <MoviesCardList
//                             setSavedMovies={setSavedMovies}
//                             handleDelete={handleDelete}
//                             cards={movies}
//                             currentUser={currentUser}
//                             searchQuery={searchQuery}
//                             isRemovable={isRemovable}
//                             onlyShortMovies={onlyShortMovies}
//                             showMoviesWhileEmptySearch={true}
//                             renewCards={renewCards}
//                         />
//                     }
//                 </section >
//             </main>
//             <Footer />
//         </>
//     );
// }

// export default SavedMovies;