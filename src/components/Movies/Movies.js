import React from 'react';
import SearchForm from "../SearchForm/SearchForm.js"
import MoviesCardList from "../MoviesCardList/MoviesCardList.js"
import Header from '../Header/Header.js'
import Footer from "../Footer/Footer.js"

function Movies() {
    return (
        <>
            <Header
                backgroundColor="#202020"
                iconColor="#313131"
                isLogged={ true }
            />
            <main className="movies">
                <section className="movies-page">
                    <SearchForm />
                    <MoviesCardList />
                </section >
            </main>
            < Footer />
        </>
    );
}

export default Movies;