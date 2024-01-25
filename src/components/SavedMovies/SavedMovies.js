import React from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"

function SavedMovies({ cards }) {
    console.log('Рендерим сохранненые кино');
console.log("log savedmovies cards",{ cards });
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
                    <MoviesCardList cards={cards} />
                </section >
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;