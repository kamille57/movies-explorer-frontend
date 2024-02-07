import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import MoviesApi from '../../utils/MoviesApi.js';
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"

function SavedMovies({ isRemovable }) {
    const [savedMovies, setSavedMovies] = useState([]);

    
    const moviesApi = new MoviesApi();

    useEffect(function(params) {
        moviesApi.getSavedMovies().then(setSavedMovies)
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
                    <MoviesCardList 
                    cards={savedMovies}
                    isRemovable={isRemovable} />
                </section >
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;