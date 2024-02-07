import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo.svg";
import account from "../../images/account.svg";
import Navigation from "../Navigation/Navigation.js";
import Slider from "../Slider/Slider.js";
import burger from "../../images/burger.svg";

const Header = ({ backgroundColor, iconColor, isLoggedIn }) => {
    const navigate = useNavigate();

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleBurgerMenuButtonClick = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    };

    return (
        <>
            <header className="header" style={{ backgroundColor }}>
                <img className="header__logo" 
                src={logo} 
                alt="Логотип."
                onClick={() => navigate("/")}
                />

                {isLoggedIn
                    ? (windowWidth > 920 ? (
                        <>
                            <Navigation />
                            <button
                                type="button"
                                className="header__btn"
                                onClick={() => navigate("/profile")}
                                >
                                Аккаунт
                                <i className="header__btn-icon" style={{ backgroundColor: iconColor }}>
                                    <img className="header__icon" src={account} alt="Иконка аккаунта." />
                                </i>
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="header__btn"
                            onClick={handleBurgerMenuButtonClick}
                        >
                            <img className="header__img" src={burger} alt="Иконка входа" />
                        </button>
                    )) :
                    (<nav className="header-nav">
                        <button
                            type="button"
                            className="header-nav__signup"
                            onClick={() => navigate("/signup")}
                        >
                            Регистрация
                        </button>
                        <button
                            type="button"
                            className="header-nav__signin"
                            onClick={() => navigate("/signin")}
                        >
                            Войти
                        </button>
                    </nav>)}
            </header >

            {isBurgerMenuOpen && (
                <Slider
                    clickHandler={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                />
            )}
        </>
    );
};

export default Header;