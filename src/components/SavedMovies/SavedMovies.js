import React from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"

function SavedMovies() {
    return (
        <>
            <Header
                backgroundColor="#202020"
                iconColor="#0F4157" />
            <main className="saved-movies">
                <section className="saved-movies-page">
                    <SearchForm />
                    <MoviesCardList />
                </section >
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;