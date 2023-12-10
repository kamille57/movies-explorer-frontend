import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg"

function Slider({ clickHandler }) {
    const navigate = useNavigate();

    return (
        <main className="slider-page">
            <div className='slider-overlay'>
            <section className="slider">
                    <button
                        type="button"
                        className="slider__btn"
                        onClick={ clickHandler }
                    ></button>
                    <nav className="slider__links">
                        <NavLink to="/" className="slider__link">
                            Главная
                        </NavLink>
                        <NavLink to="/movies" className="slider__link">
                            Фильмы
                        </NavLink>
                        <NavLink to="/saved-movies" className="slider__link">
                            Сохраненные фильмы
                        </NavLink>
                        </nav>
                        <img
                            className="slider__img"
                            src={profileDark}
                            onClick={() => navigate("/signin")}
                            alt="Иконка входа"
                        />
                </section>
            </div>
              
        </main>
    );
}

export default Slider;