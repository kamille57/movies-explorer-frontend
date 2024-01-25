import React from "react";
import MoviesApi from "../../utils/MoviesApi";
//import CurrentUserContext from "../../contexts/CurrentUserContext";

function MoviesCard({ card }) {

  const imageUrl = 'https://api.nomoreparties.co' + card.image.url;
  const moviesApi = new MoviesApi();

  function handleChange(e) {
    console.log(e.target);
    const isChecked = e.target.checked;
    console.log(isChecked);
    if(isChecked) {
      console.log('need to save');
      moviesApi.createMovie(card)
    } else {
      console.log('need to delete');
      moviesApi.deleteMovie(card.id)
    }
  }

  return (
    <article className="card">
      <figure className="card__figure">
        <img className="card__pic" src={imageUrl} alt={`Заставка ролика ${card.nameRU}`} />
        <figcaption className="card__caption">{card.nameRU}</figcaption>
        <label className="card-checkbox">
          <input className="card-checkbox__input" type="checkbox" placeholder="" onChange={handleChange} />
          <span className="card-checkbox__inner"></span>
        </label>
      </figure>
      <div className="card__duration" placeholder="Enter duration">{card.duration}мин</div>
    </article>
  );
}

export default MoviesCard;

// function MoviesCard({ movie, isSavedPage, onLike, onDelete, likedMovies }) {
//     const isMovieLiked = likedMovies && likedMovies.some(likedMovie => likedMovie.movieId === movie.id);

//     const imageUrl = typeof movie.image === 'string'
//         ? movie.image
//         : MOVIE_API_URL + movie.image.url;

//     const handleLikeClick = async () => {
//         try {
//             if (isMovieLiked) {
//                 if (!isSavedPage) {
//                     await onDelete(movie);
//                 }
//             } else {
//                 if (onLike) {
//                     await onLike(movie);
//                 }
//             }
//         } catch (error) {
//             console.error('Ошибка при обработке лайка:', error);
//         }
//     };

//     const handleDeleteClick = () => {
//         if (isSavedPage) {
//             onDelete(movie);
//         }
//     };

//     return (
//         <li className='movies-card'>
//             <a className='movies-card__movie-link' href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
//                 <img
//                     className='movies-card__image'
//                     src={imageUrl}
//                     alt={`Заставка ролика ${movie.nameRU}`}
//                 />
//             </a>
//             <div className='movies-card__group'>
//                 <h2 className='movies-card__name'>{movie.nameRU}</h2>
//                 {isSavedPage ? (
//                     <button
//                         className='movies-card__button movies-card__button_delete'
//                         onClick={handleDeleteClick}
//                         type='button'
//                     />
//                 ) : (
//                     <button
//                         className={`movies-card__button ${isMovieLiked ? 'movies-card__button_liked' : ''}`}
//                         onClick={handleLikeClick}
//                         type='button'
//                     />
//                 )}
//             </div>
//             <p className='movies-card__duration'>{formatDuration(movie.duration)}</p>
//         </li>
//     );
// }