import React, { useState } from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg"

function Profile() {

    const [name, setName] = useState('Виталий');
    const [email, setEmail] = useState('pochta@yandex.ru');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };

    return (
        <>
            <Header
                backgroundColor="#202020"
                profileSrc={profileDark} />
            <h2 className="profile__title">Привет, {name}</h2>
            <main className="profile">
                <section className="profile">
                    <div className="profile__inputs">
                        <span className="profile__input-text">Имя
                            <label className="profile__label" htmlFor="name"></label>
                            <input
                                type="text"
                                className="profile__input"
                                name="name"
                                id="name"
                                minLength="2"
                                maxLength="40"
                                onChange={handleInputChange}
                                value={name}
                            ></input></span>
                        <span className="profile__input-text">E-mail
                            <label className="profile__label" htmlFor="email"></label>
                            <input
                                className="profile__input"
                                required
                                name="email"
                                type="email"
                                id="email"
                                minLength="2"
                                maxLength="40"
                                onChange={handleInputChange}
                                value={email}
                            /></span>
                    </div>
                    <div className="profile__confirm">
                        <button type="submit" className="profile__confirm-btn">Редактировать</button>
                        <NavLink to="/" className="profile__confirm-link">
                            Выйти из аккаунта
                        </NavLink>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;