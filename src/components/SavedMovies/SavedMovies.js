import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesApi from "../../utils/MoviesApi.js";

function SavedMovies({ isLoading, handleDelete }) {
  const [savedMovies, setSavedMovies] = useState([]);

  const moviesApi = new MoviesApi();

  useEffect(() => {  
    moviesApi  
    .getSavedMovies()  
    .then((data) => {  
      console.log('savedMovies', data);  
      setSavedMovies(data);  
      localStorage.setItem("likedMovies", JSON.stringify(data));  
    })  
}, []);

console.log(savedMovies);

  const handleFilteredMovies = (savedMovies) => {
    setSavedMovies(savedMovies);
  };


  // const updateSavedMovies = () => {
  //   setFilteredMovies(savedCards);
  // };

  // const handleFilteredMovies = (filteredCards) => {
  //   setFilteredMovies(filteredCards);
  // };

  return (
    <>
      <Header backgroundColor="#202020" iconColor="#313131" isLoggedIn={true} />
      <main className="saved-movies">
        <section className="saved-movies-page">
          <SearchForm
            cards={savedMovies}
            handleSearch={handleFilteredMovies}
            isSaved={true}
          />
          {isLoading && console.log(isLoading) ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={savedMovies}
              // handleDelete={handleDelete}
              isSaved={true}
              // updateSavedMovies={updateSavedMovies}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
