import React, { useState, useEffect } from "react";

function MoviesCard({
  card,
  handleLike,
  handleDelete,
  isSaved,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedLikedMovies = JSON.parse(localStorage.getItem("likedMovies"));
    const isLiked = storedLikedMovies.some((movie) => movie.id === card.id);
    setIsChecked(isLiked);
  }, [card]);

  const imageUrl =
    typeof card.image === "string"
      ? card.image
      : "https://api.nomoreparties.co" + card.image.url;

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      const updatedCard = {
        ...card,
        image: imageUrl,
        director: card.director.slice(0, 30),
        createdAt: card.created_at,
        updatedAt: card.updated_at,
      };
      delete updatedCard.created_at;
      delete updatedCard.updated_at;

      handleLike(updatedCard);
    } else {
      handleDelete(card.id);
    }
  };

  const movieRemove = () => {
    console.log('удаляем на крестик');
    console.log(card._id);
    handleDelete(card._id);
  };

  return (
    <article className="card">
      <figure className="card__figure">
        <a
          className="card__link"
          href={card.trailerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="card__pic"
            src={imageUrl}
            alt={`Заставка ролика ${card.nameRU}`}
          />
        </a>
        <figcaption className="card__caption">{card.nameRU}</figcaption>
        {isSaved ? (
          <div className="card-checkbox__cross" onClick={movieRemove} />
        ) : (
          <label className="card-checkbox">
            <input
              className="card-checkbox__input"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
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
