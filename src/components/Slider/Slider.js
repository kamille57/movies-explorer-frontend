import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg"

function Slider() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    const handleButtonClick = () => {
        setIsVisible(false);
    };

    return (
        <main className="slider-page">
            {isVisible && (<>
                <div className='slider-overlay'></div>
                <section className="slider">
                    <button
                        type="button"
                        className="slider__btn"
                        onClick={handleButtonClick}
                    ></button>
                    <div className="slider__links">
                        <NavLink to="/" className="slider__link">
                            Главная
                        </NavLink>
                        <NavLink to="/movies" className="slider__link">
                            Фильмы
                        </NavLink>
                        <NavLink to="/saved-movies" className="slider__link">
                            Сохраненные фильмы
                        </NavLink>
                        </div>
                        <img
                            className="slider__img"
                            src={profileDark}
                            onClick={() => navigate("/sign-in")}
                            alt="Иконка входа"
                        />
                </section>
            </>
            )}

        </main>
    );
}

export default Slider;