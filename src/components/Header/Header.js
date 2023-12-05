import React, { useState } from 'react'; 
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import logo from "../../images/logo.svg"; 
import Navigation from "../Navigation/Navigation.js"; 
import Slider from "../Slider/Slider.js"; 
import burger from "../../images/burger.svg"; 
 
function Header({ backgroundColor, profileSrc }) { 
    const navigate = useNavigate();

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const handleBurgerMenuClick = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    }

    return ( 
        <Routes> 
            <Route 
                path="/" 
                element={ 
                    <> 
                        <header className="header" style={{ backgroundColor }}> 
                            <img className="header__logo" src={logo} alt="Логотип" /> 
                            <Navigation /> 
                            <button 
                                type="button" 
                                className="header__btn" 
                            > 
                                <img 
                                    className="header__img header__img_full" 
                                    src={profileSrc} 
                                    onClick={() => navigate("/sign-in")} 
                                    alt="Иконка входа" 
                                /> 
                                <img 
                                    className="header__img header__img_burger" 
                                    src={burger} 
                                    alt="Иконка входа" 
                                    onClick={handleBurgerMenuClick} 
                                /> 
                            </button> 
                        </header> 
                        {isBurgerMenuOpen && <Slider />}
                    </> 
                } 
            /> 
        </Routes> 
    ); 
} 
 
export default Header;