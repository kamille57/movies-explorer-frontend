import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from '../../utils/MainApi.js';

function MoviesCard({ card, isRemovable, isSaved = false, renewCards }) {
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

  function handleRemove() {
    moviesApi.deleteMovie(card._id)
      .then(() => {
        setIsMovieChecked(false);
        setIsMovieSaved(false)
        renewCards();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e) {
    const isChecked = e.target.checked;
    console.log('card', card);
    const updatedCard = {
      ...card,
      image: imageUrl,
      director: card.director.slice(0, 30),
      createdAt: card.created_at,
      updatedAt: card.updated_at,
    };
    delete updatedCard.created_at;
    delete updatedCard.updated_at;

    console.log(updatedCard);
    if (isChecked) { // если чекнуто, добавляем фильм на сервер  

      moviesApi.createMovie(updatedCard);
      renewCards();

      // Получаем ownerId    
      moviesApi.getSavedMovies()

        .then(savedMovies => {
          const ownerId = savedMovies.find(movie => movie.id === card.id).owner;
          console.log(savedMovies);
          console.log('ownerID', ownerId);
          api.getUserInfo() // получаем id юзера, чтобы сравнить с id овнера карточки    
            .then((userData) => {
              console.log('Owner ID:', ownerId);
              console.log('userData ID', userData);
              if (userData._id === ownerId) {
                setIsMovieSaved(isChecked);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(error => {
          console.error('Ошибка при получении сохраненных фильмов: ', error);
        });
    }
  }


  function getDurationInHoursAndMinutes(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч ${minutes}мин`;
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