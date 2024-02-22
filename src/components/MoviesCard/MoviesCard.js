import React, { useState } from "react";
import MoviesApi from "../../utils/MoviesApi";

function MoviesCard({ card, isRemovable, renewCards }) {
  const imageUrl = typeof card.image === "string" ? card.image : "https://api.nomoreparties.co" + card.image.url;

  const moviesApi = new MoviesApi();
  const [isDeleted, setIsDeleted] = useState(false);

  function handleRemove() {
    moviesApi.deleteMovie(card._id)
      .then(() => {
        setIsDeleted(true); 
        renewCards()
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
    return null;
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
            <input className="card-checkbox__input" type="checkbox" placeholder="" onChange={handleChange} />
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