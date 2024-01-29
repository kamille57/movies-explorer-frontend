import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import MoviesApi from '../../utils/MoviesApi.js';
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"

function SavedMovies() {
    const [savedMovies, setSavedMovies] = useState([]);

    
    const moviesApi = new MoviesApi();


    console.log('Рендерим сохранненые кино');

    useEffect(function(params) {
        moviesApi.getSavedMovies().then(setSavedMovies)
        // setSavedMovies(savedMovies);
    },[])

    return (
        <>
            <Header
                backgroundColor="#202020"
                iconColor="#313131"
                isLoggedIn={true}
            />
            <main className="saved-movies">
                <section className="saved-movies-page">
                    <SearchForm />
                    <MoviesCardList cards={savedMovies} />
                </section >
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;