class MoviesApi {
    constructor() {
        this.baseUrl = 'https://api.nomoreparties.co/beatfilm-movies'; 
        this.localUrl = 'http://localhost:3001/movies'; 
        this.credentials = 'include';
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options)
            .then(this._checkResponse);
    }
    async getInitialMovies() { 
        return fetch(this.baseUrl, {
            headers: this.headers
        })
        .then(this._checkResponse);
    }

    async createMovie(movieData) { 
        return fetch(this.localUrl, {
            method: 'POST',
            headers: this.headers,
            credentials: this.credentials,
            body: JSON.stringify(movieData)
        })
        .then(this._checkResponse);
    }
    
    async deleteMovie(movieId) {
        return fetch(`${this.localUrl}/${movieId}`, {
            method: 'DELETE',
            credentials: this.credentials,
            headers: this.headers
        })
        .then(this._checkResponse);
    }
}

export default MoviesApi;


// import React, { useState, useContext, useEffect } from 'react';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import SearchForm from '../SearchForm/SearchForm';
// import { moviesApi } from '../../utils/MoviesApi';
// import filterMovies from '../../utils/filterMovies';
// import { mainApi } from '../../utils/TempMainApi';
// import { LikesContext } from '../../contexts/LikesContext';
// import Preloader from '../Preloader/Preloader';
// import { handleError } from '../../utils/handleError';
// import {
//     MOVIE_API_URL,
//     likedMoviesErrors,
//     movieDeleteErrors,
//     movieLikeErrors,
//     movieSearchErrors
// } from '../../constants/constatnts';

// const Movies = () => {
//     const [searchResults, setSearchResults] = useState([]);
//     const { likedMovies, setLikedMovies } = useContext(LikesContext);
//     const [isLoading, setIsLoading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isShortFilm, setIsShortFilm] = useState(false);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [searchError, setSearchError] = useState('');
//     const [originalMovies, setOriginalMovies] = useState([]);

//     useEffect(() => {
//         const savedLikedMovies = localStorage.getItem('likedMovies');
//         if (savedLikedMovies) {
//             setLikedMovies(JSON.parse(savedLikedMovies));
//         }
//     }, []);
    
//     const handleSearchSubmit = async (query) => {
//         setIsLoading(true);
//         setHasSearched(true);
//         setSearchError('');
//         setSearchQuery(query.movie);
//         setIsShortFilm(query.isShortFilm);

//         const savedMovies = localStorage.getItem('initialMovies');
//         if (savedMovies) {
//             const parsedMovies = JSON.parse(savedMovies);
//             setOriginalMovies(parsedMovies);
//             const filteredMovies = filterMovies(parsedMovies, query.movie, query.isShortFilm);
//             setSearchResults(filteredMovies);
//         } else {
//             try {
//                 const movies = await moviesApi.getInitialMovies();
//                 setOriginalMovies(movies);
//                 const filteredMovies = filterMovies(movies, query.movie, query.isShortFilm);
//                 setSearchResults(filteredMovies);

//                 localStorage.setItem('initialMovies', JSON.stringify(movies));
//             } catch (error) {
//                 const errorMessage = handleError(error, movieSearchErrors);
//                 setSearchError(errorMessage);
//             }
//         }

//         localStorage.setItem('searchQuery', query.movie);
//         localStorage.setItem('isShortFilm', query.isShortFilm);
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         const savedSearchQuery = localStorage.getItem('searchQuery');
//         const savedIsShortFilm = localStorage.getItem('isShortFilm') === 'true';
//         const savedMovies = localStorage.getItem('initialMovies');

//         if (savedMovies) {
//             const parsedMovies = JSON.parse(savedMovies);
//             setOriginalMovies(parsedMovies);

//             if (savedSearchQuery !== null) {
//                 setSearchQuery(savedSearchQuery);
//                 setIsShortFilm(savedIsShortFilm);
//                 const reFilteredMovies = filterMovies(parsedMovies, savedSearchQuery, savedIsShortFilm);
//                 setSearchResults(reFilteredMovies);
//                 setHasSearched(true);
//             }
//         }
//     }, []);

//     const onLike = async (movie) => {
//         try {
//             const movieData = {
//                 country: movie.country,
//                 director: movie.director,
//                 duration: movie.duration,
//                 year: movie.year,
//                 description: movie.description,
//                 image: MOVIE_API_URL + movie.image.url,
//                 trailerLink: movie.trailerLink,
//                 thumbnail: MOVIE_API_URL + movie.image.formats.thumbnail.url,
//                 movieId: movie.id.toString(),
//                 nameRU: movie.nameRU,
//                 nameEN: movie.nameEN,
//             };
//             const savedMovie = await mainApi.addMovieLike(movieData);
//             setLikedMovies([...likedMovies, savedMovie]);
//             localStorage.setItem('likedMovies', JSON.stringify([...likedMovies, savedMovie]));
//         } catch (error) {
//             const errorMessage = handleError(error, movieLikeErrors);
//             console.error(errorMessage);
//         }
//     };

//     const loadLikedMovies = async () => {
//         try {
//             const likedMoviesData = await mainApi.getSavedMovies();
//             setLikedMovies(likedMoviesData);
//         } catch (error) {
//             const errorMessage = handleError(error, likedMoviesErrors);
//             console.error(errorMessage);
//         }
//     };

//     useEffect(() => {
//         const savedSearchQuery = localStorage.getItem('searchQuery');
//         const savedIsShortFilm = localStorage.getItem('isShortFilm') === 'true';
//         const savedMovies = localStorage.getItem('originalMovies');
      
//         if (savedMovies) {
//             const parsedMovies = JSON.parse(savedMovies);
//             setOriginalMovies(parsedMovies);
      
//             if (savedSearchQuery !== null) {
//                 setSearchQuery(savedSearchQuery);
//                 setIsShortFilm(savedIsShortFilm);
//                 const reFilteredMovies = filterMovies(parsedMovies, savedSearchQuery, savedIsShortFilm);
//                 setSearchResults(reFilteredMovies);
//                 setHasSearched(true);
      
//                 loadLikedMovies();
//             }
//         }
//     }, []);   
    

//     function findSavedMovieById(savedMovies, movieId) {
//         const foundMovie = savedMovies.find(movie => movie.movieId.toString() === movieId.toString());
//         return foundMovie ? foundMovie._id : null;
//     }
    
//     const onDelete = async (movie) => {
//         const savedMovieId = findSavedMovieById(likedMovies, movie.id);
//         if (savedMovieId) {
//             try {
//                 await mainApi.removeMovieLike(savedMovieId);
//                 setLikedMovies(prevLikedMovies => prevLikedMovies.filter(likedMovie => likedMovie._id !== savedMovieId));
//                 const updatedLikedMovies = likedMovies.filter(likedMovie => likedMovie._id !== savedMovieId);
//                 setLikedMovies(updatedLikedMovies);

//                 localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
//             } catch (error) {
//                 const errorMessage = handleError(error, movieDeleteErrors);
//                 console.error(errorMessage);
//             }
//         } else {
//             console.error('Фильм для удаления не найден');
//         }
//     };    

//     const handleFilterChange = (isSorted) => {
//         setIsShortFilm(isSorted);
//         const reFilteredMovies = filterMovies(originalMovies, searchQuery, isSorted);
//         setSearchResults(reFilteredMovies);
      
//         localStorage.setItem('isShortFilm', isSorted.toString());
//     };     

//     return (
//         <main className='main'>
//             <SearchForm
//                 onSubmit={handleSearchSubmit}
//                 isPreloading={isLoading}
//                 defaultValue={searchQuery}
//                 onFilterChange={handleFilterChange}
//                 isShortFilm={isShortFilm}
//             />
//             {isLoading && <Preloader />}
//             {!isLoading && hasSearched && searchResults.length === 0 && !searchError && <p className='search-form__error'>Ничего не найдено</p>}
//             {!isLoading && searchError && <p className='search-form__error'>{searchError}</p>}
//             {!isLoading && hasSearched && searchResults.length > 0 && (
//                 <MoviesCardList
//                     movies={searchResults}
//                     onLike={onLike}
//                     onDelete={onDelete}
//                     likedMovies={likedMovies}
//                 />
//             )}
//             {!isLoading && !hasSearched &&
//             <span className='wide-open-space'>
//                 Введите поисковый запрос
//             </span>}
//         </main>
//     );
// };

// export default Movies;