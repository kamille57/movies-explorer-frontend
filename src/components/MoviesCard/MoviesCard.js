import React from "react"; 
import pic from '../../images/pic.jpg' 
 
function MoviesCard({ card, index }) { 
    const uniqId = "cardCheckbox-" + index;
 
    return ( 
        <article className="card"> 
            <figure className="card__figure"> 
                <img className="card__pic" src={pic} alt="картинка" /> 
                <figcaption className="card__caption">33 слова о дизайне</figcaption> 
                <label className="card-checkbox" htmlFor={uniqId}> 
                    <input className="card-checkbox__input" type="checkbox" id={uniqId}></input> 
                    <span className="card-checkbox__inner"></span> 
                </label> 
            </figure> 
            <div className="card__duration">1ч42м</div> 
        </article> 
    ); 
} 
 
export default MoviesCard;