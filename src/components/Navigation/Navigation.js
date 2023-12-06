import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navigation">
            <NavLink to="/movies" className="navigation__link">
                Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation__link">
                Сохраненные фильмы
            </NavLink>
        </nav>
    );
}

export default Navigation;