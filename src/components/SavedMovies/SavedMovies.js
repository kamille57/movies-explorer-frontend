import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import MoviesApi from '../../utils/MoviesApi.js';
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"

function SavedMovies({ cards, setSavedMovies, isRemovable, renewCards, currentUser }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [onlyShortMovies, setOnlyShortMovies] = useState(false);
    // const [savedMovies, setSavedMovies] = useState([]);

    const moviesApi = new MoviesApi();

    // useEffect(function (params) { 
    //     moviesApi.getSavedMovies() 
    //         .then(setSavedMovies) 
    // }, []) 

    useEffect(function () {
        const onlyShortMovies = localStorage.getItem('onlyShortMovies');
        if (onlyShortMovies === "true") {
            setOnlyShortMovies(true)
        }
        const moviesSearchQuery = localStorage.getItem('savedMoviesSearchQuery');
        if(moviesSearchQuery) setSearchQuery(moviesSearchQuery)
    }, [])


    useEffect(function () {
        localStorage.setItem('savedMoviesSearchQuery', searchQuery);
    }, [searchQuery, setSearchQuery])


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
                        setSearchQuery={setSearchQuery}
                        searchQuery={searchQuery}
                        setOnlyShortMovies={setOnlyShortMovies}
                        onlyShortMovies={onlyShortMovies}
                    />
                    <MoviesCardList
                        cards={cards}
                        currentUser={currentUser}
                        searchQuery={searchQuery}
                        isRemovable={isRemovable}
                        onlyShortMovies={onlyShortMovies}
                        showMoviesWhileEmptySearch={true}
                        renewCards={renewCards}
                    />
                </section >
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;