import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from '../../utils/MainApi.js';

function MoviesCard({ card, isRemovable, isSaved = false, handleRemove }) {
  const imageUrl = typeof card.image === "string" ? card.image : "https://api.nomoreparties.co" + card.image.url;

  const moviesApi = new MoviesApi();
  const api = new MainApi();

  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isChecked, setIsMovieChecked] = useState(false);

  useEffect(() => {
    setIsMovieSaved(false)
    setIsMovieChecked(false)
    if (isSaved) {
      setIsMovieSaved(true);
    }
  }, [isSaved]);

  const movieRemove = () => {
    handleRemove(card._id);

  };

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
      moviesApi.getSavedMovies()
        .then(savedMovies => {
          const ownerId = savedMovies.find(movie => movie.id === card.id).owner;

          api.getUserInfo()
            .then((userData) => {
              if (userData._id === ownerId) {
                setIsMovieSaved(isChecked);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(error => console.log('Error getting saved movies: ', error));

    } else {
      moviesApi.getSavedMovies()
        .then(savedMovies => {
          const movieToBeDeleted = savedMovies.find(movie => movie.id === card.id);
          console.log(movieToBeDeleted);
          if (movieToBeDeleted) {
            moviesApi.deleteMovie(movieToBeDeleted._id);
            setIsMovieSaved(false);
            setIsMovieChecked(false);

        
          }
        })
        .catch(error => console.log(error));
    }
  }

  function getDurationInHoursAndMinutes(duration) {
    if (duration < 60) {
      return `${duration} мин`;
    } else if (duration % 60 === 0) {
      return `${duration / 60} ч`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}ч ${minutes}мин`;
    }
  }

  return (
    <article className="card">
      <figure className="card__figure">
        <a className="card__link" href={card.trailerLink} target="_blank" rel="noopener noreferrer">
          <img className="card__pic" src={imageUrl} alt={`Заставка ролика ${card.nameRU}`} />
        </a>
        <figcaption className="card__caption">{card.nameRU}</figcaption>
        {isRemovable ? (
          <div className="card-checkbox__cross" onClick={movieRemove} />
        ) : (
          <label className="card-checkbox">
            <input className="card-checkbox__input" type="checkbox" placeholder="" checked={isMovieSaved} onChange={handleChange} />
            <span className="card-checkbox__inner"></span>
          </label>
        )}
      </figure>
      <div className="card__duration" placeholder="Enter duration">
        {getDurationInHoursAndMinutes(card.duration)}
      </div>
    </article>
  );
}

export default MoviesCard;