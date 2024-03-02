import React, { useState } from 'react';

function MoviesCard({ card, handleLike }) {
  const [isChecked, setIsChecked] = useState(false);

  const imageUrl = typeof card.image === "string" ? card.image : "https://api.nomoreparties.co" + card.image.url;

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
            // delete updatedCard.saved;
            // delete updatedCard._id;
      handleLike(updatedCard); // Вызываем функцию handleLike при установке флажка
    }
  };

  return (
    <article className="card">
      <figure className="card__figure">
        <a className="card__link" href={card.trailerLink} target="_blank" rel="noopener noreferrer">
          <img className="card__pic" src={imageUrl} alt={`Заставка ролика ${card.nameRU}`} />
        </a>
        <figcaption className="card__caption">{card.nameRU}</figcaption>
        <label className="card-checkbox">
          <input className="card-checkbox__input" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <span className="card-checkbox__inner"></span>
        </label>
      </figure>
      <div className="card__duration" placeholder="Enter duration">
        {getDurationInHoursAndMinutes(card.duration)}
      </div>
    </article>
  );
}

export default MoviesCard;

// function MoviesCard({ card, isRemovable, handleDelete, handleLike }) {

//   const [isChecked, setIsChecked] = useState(false);
//   if(card.saved !== undefined) {
//     console.log(card.nameRU, card.saved);
//   }
  
//   const imageUrl = typeof card.image === "string" ? card.image : "https://api.nomoreparties.co" + card.image.url;

//   const movieRemove = () => {
//     handleDelete(card._id);
//   };

//   function handleChange(e) {
//     const isChecked = e.target.checked;
//     const updatedCard = {
//       ...card,
//       image: imageUrl,
//       director: card.director.slice(0, 30),
//       createdAt: card.created_at,
//       updatedAt: card.updated_at,
//     };
//     delete updatedCard.created_at;
//     delete updatedCard.updated_at;
//     // delete updatedCard.saved;
//     // delete updatedCard._id;

//     if (isChecked) {
//       console.log('here');
//       console.log(updatedCard);
//       handleLike(updatedCard);
//       setIsChecked(true)
//     } else {
//       handleDelete(card._id);
//     }
//   }

//   function getDurationInHoursAndMinutes(duration) {
//     if (duration < 60) {
//       return `${duration} мин`;
//     } else if (duration % 60 === 0) {
//       return `${duration / 60} ч`;
//     } else {
//       const hours = Math.floor(duration / 60);
//       const minutes = duration % 60;
//       return `${hours}ч ${minutes}мин`;
//     }
//   }

//   return (
//     <article className="card">
//       <figure className="card__figure">
//         <a className="card__link" href={card.trailerLink} target="_blank" rel="noopener noreferrer">
//           <img className="card__pic" src={imageUrl} alt={`Заставка ролика ${card.nameRU}`} />
//         </a>
//         <figcaption className="card__caption">{card.nameRU}</figcaption>
//         {isRemovable ? (
//           <div className="card-checkbox__cross" onClick={movieRemove} />
//         ) : (
//           <label className="card-checkbox">
//             <input className="card-checkbox__input" type="checkbox" checked={card.saved ? true : false} onChange={handleChange} />
//             <span className="card-checkbox__inner"></span>
//           </label>
//         )}
//       </figure>
//       <div className="card__duration" placeholder="Enter duration">
//         {getDurationInHoursAndMinutes(card.duration)}
//       </div>
//     </article>
//   );
// }

// export default MoviesCard;