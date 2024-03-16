import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi.js";

function MoviesCard({ card, isSaved, setIsOnCrossDeleted }) {
  const [isChecked, setIsChecked] = useState(false);
  const moviesApi = new MoviesApi();
  const storedLikedMovies = JSON.parse(localStorage.getItem("likedMovies"));

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

  const handleLike = (movie) => {
    return moviesApi
      .createMovie(movie)
      .then((data) => {
        const storedLikedMovies = JSON.parse(
          localStorage.getItem("likedMovies")
        );
        const updatedLikedMovies = [...storedLikedMovies, data];
        localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  const handleDelete = (movieId) => {
    const movieToDelete = storedLikedMovies.find(
      (movie) => movie.id === movieId
    );

    return moviesApi
      .deleteMovie(movieToDelete._id)
      .then(() => {
        const storedLikedMovies = JSON.parse(
          localStorage.getItem("likedMovies")
        );
        const updatedSavedMovies = storedLikedMovies.filter(
          (movie) => movie.id !== movieId
        );
        localStorage.setItem("likedMovies", JSON.stringify(updatedSavedMovies));
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  const handleCheckboxChange = () => {
    if (!isChecked) {
      const updatedCard = {
        ...card,
        image: imageUrl,
        country: card.country.slice(0, 30),
        director: card.director.slice(0, 30),
        createdAt: card.created_at,
        updatedAt: card.updated_at,
      };
      delete updatedCard.created_at;
      delete updatedCard.updated_at;

      handleLike(updatedCard).then((res) => {
        console.log("Ответ: " + res);
        if (res === true) setIsChecked(true);
      });
    } else {
      handleDelete(card.id).then((res) => {
        console.log("Ответ: " + res);
        if (res === true) setIsChecked(false);
      });
    }
  };

  const movieRemove = () => {
    handleDelete(card.id).then((res) => {
      setIsOnCrossDeleted(true);
      console.log("Ответ: " + res);
      if (res === true) setIsChecked(false);
    });
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
