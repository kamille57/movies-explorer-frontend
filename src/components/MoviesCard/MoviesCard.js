import React, { useState } from "react";
import MoviesApi from "../../utils/MoviesApi";

function MoviesCard({ card, isRemovable }) {
  const imageUrl = typeof card.image === "string" ? card.image : "https://api.nomoreparties.co" + card.image.url;

  const moviesApi = new MoviesApi();
  const [isDeleted, setIsDeleted] = useState(false); 

  function handleRemove() {
    moviesApi.deleteMovie(card._id)
      .then(() => {
        setIsDeleted(true); // Обновление состояния после успешного удаления
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleChange(e) {  
    const isChecked = e.target.checked;  
    const updatedCard = {  
      ...card,  
      image: imageUrl,  
      director: card.director.slice(0, 30),  
      createdAt: card.created_at,  
      updatedAt: card.updated_at,  
    };  
  
    delete updatedCard.created_at;  
    delete updatedCard.updated_at;  
    if (isChecked) {  
      moviesApi.createMovie(updatedCard);  
    }  
  }  

  if (isDeleted) {
    return null; // Рендеринг null, если фильм удален
  }

  return (
    <article className="card">
      <figure className="card__figure">
        <img className="card__pic" src={imageUrl} alt={`Заставка ролика ${card.nameRU}`} />
        <figcaption className="card__caption">{card.nameRU}</figcaption>
        {isRemovable ? (
          <div className="card-checkbox__cross" onClick={handleRemove} />
        ) : (
          <label className="card-checkbox">
            <input className="card-checkbox__input" type="checkbox" placeholder="" onChange={handleChange} />
            <span className="card-checkbox__inner"></span>
          </label>
        )}
      </figure>
      <div className="card__duration" placeholder="Enter duration">
        {card.duration}мин
      </div>
    </article>
  );
}

export default MoviesCard;

// function MoviesCard({ card, isSavedPage, onLike, onDelete, likedMovies }) {
//   const isMovieLiked = likedMovies && likedMovies.some(likedMovie => likedMovie.movieId === card.id);

//   const imageUrl = typeof card.image === 'string'
//     ? card.image
//     : 'https://api.nomoreparties.co' + card.image.url;

//   //   const moviesApi = new MoviesApi();

//   const handleLikeClick = async () => {
//     try {
//       if (isMovieLiked) {
//         if (!isSavedPage) {
//           await onDelete(card);
//         }
//       } else {
//         if (onLike) {
//           await onLike(card);
//         }
//       }
//     } catch (error) {
//       console.error('Ошибка при обработке лайка:', error);
//     }
//   };

//   const handleDeleteClick = () => {
//     if (isSavedPage) {
//       onDelete(card);
//     }
//   };

//   return (
//     <li className='card'>
//       <a href={card.trailerLink} target='_blank' rel='noopener noreferrer'>
//         <img
//           className='card__pic'
//           src={imageUrl}
//           alt={`Заставка ролика ${card.nameRU}`}
//         />
//       </a>
//       <figure className="card__figure">
//         <img className="card__pic" src={imageUrl} alt={`Заставка ролика ${card.nameRU}`} />
//         <figcaption className="card__caption">{card.nameRU}</figcaption>
//         {isSavedPage ? (
//           <button
//             className='movies-card__button movies-card__button_delete'
//             onClick={handleDeleteClick}
//             type='button'
//           />
//         ) : (
//           <button
//             className={`movies-card__button ${isMovieLiked ? 'movies-card__button_liked' : ''}`}
//             onClick={handleLikeClick}
//             type='button'
//           />
//         )}
//       </figure>
//       <p className="card__duration" placeholder="Enter duration">{card.duration}мин</p>
//     </li>
//   );
// }

// export default MoviesCard;
