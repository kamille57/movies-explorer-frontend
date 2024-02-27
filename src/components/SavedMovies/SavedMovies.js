import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"
import Preloader from '../Preloader/Preloader.js';
import MoviesApi from "../../utils/MoviesApi";

function SavedMovies({ cards, isLoading, isRemovable, currentUser, renewCards }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [onlyShortMovies, setOnlyShortMovies] = useState(false);
    const [movies, setSavedMovies] = useState(cards);
    const moviesApi = new MoviesApi();

    useEffect(function () {
        const onlyShortMovies = localStorage.getItem('onlyShortMovies');
        if (onlyShortMovies === "true") {
            setOnlyShortMovies(true)
        }
        const moviesSearchQuery = localStorage.getItem('savedMoviesSearchQuery');
        if (moviesSearchQuery) setSearchQuery(moviesSearchQuery)
    }, [])

    useEffect(function () {
        localStorage.setItem('savedMoviesSearchQuery', searchQuery);
    }, [searchQuery, setSearchQuery])

    const globalCardFilter = (e) => {
        e.preventDefault();
        const fixedCards = cards.map(card => {
            const imageUrl = typeof card.image === 'string'
                ? card.image
                : 'https://api.nomoreparties.co' + card.image.url;
            const newCard = {
                ...card,
                image: imageUrl
            };

            return newCard;
        });

        const regex = new RegExp(searchQuery, 'gi');
        let filteredMovies = fixedCards.filter(movie => movie.nameRU.match(regex));

        if (onlyShortMovies) {
            filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
        }
        setSavedMovies(filteredMovies);
    };

    const handleRemove = (id) => {
        moviesApi.deleteMovie(id)
            .then(() => {
                const updatedMovies = movies.filter(movie => movie._id !== id);
                setSavedMovies(updatedMovies);
                renewCards();
            })
            .catch((err) => console.log(err));
    };

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
                        handleSubmit={globalCardFilter}
                        setOnlyShortMovies={setOnlyShortMovies}
                        onlyShortMovies={onlyShortMovies}
                    />
                    {isLoading ?
                        <Preloader />
                        : <MoviesCardList
                            setSavedMovies={setSavedMovies}
                            handleRemove={handleRemove}
                            cards={movies}
                            currentUser={currentUser}
                            searchQuery={searchQuery}
                            isRemovable={isRemovable}
                            onlyShortMovies={onlyShortMovies}
                            showMoviesWhileEmptySearch={true}
                            renewCards={renewCards}
                        />
                    }
                </section >
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;