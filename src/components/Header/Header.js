import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from "../../images/logo.svg";
import account from "../../images/account.svg"
import Navigation from "../Navigation/Navigation.js";
import Slider from "../Slider/Slider.js";
import burger from "../../images/burger.svg";

function Header({ backgroundColor, iconColor }) {
    const navigate = useNavigate();

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <header className="header" style={{ backgroundColor }}>
                            <img className="header__logo" src={logo} alt="Логотип." />
                            <Navigation />
                            <button
                                type="button"
                                className="header__btn header__img_full"
                                onClick={() => navigate("/signin")}
                            >
                                Аккаунт
                                <i className="header__btn-icon" style={{ backgroundColor: iconColor }} >
                                    <img className="header__icon" src={account} alt="Иконка аккаунта." />
                                </i>
                            </button>
                            <button
                                type="button"
                                className="header__btn  header__img_burger"
                                onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                            >
                                <img
                                    className="header__img header__img_burger"
                                    src={burger}
                                    alt="Иконка входа"

                                />
                            </button>
                        </header>
                        {isBurgerMenuOpen && <Slider
                            clickHandler={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                        />}
                    </>
                }
            />
        </Routes>
    );
}

export default Header;