import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import MainApi from '../../utils/MainApi.js'

const api = new MainApi();

function Profile({ setCurrentUser}) {
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser);
    const [name, setName] = useState(currentUser?.name);
    const [email, setEmail] = useState(currentUser?.email);


    const navigate = useNavigate(); // Add the useNavigate hook

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };
    // TODO: не забудьте собрать новые данные с формы и отправить их на сервер, затем считать ответ от сервера и принять решение что делать в завиисмости от ответа 
    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUser =
            { email, name }
            ;
        console.log("upduser", updatedUser);
        api.setUserInfo(updatedUser)
            .then(({ email, name }) => {
                console.log({email, name});
                setCurrentUser({ email, name });

            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(function () {
        if (!currentUser) {
            // alert('You forgot loggin');
            console.warn('You forgot loggin');
            navigate("/signup");
        }
    }, [currentUser, navigate])



    return (
        <>
            <Header
                backgroundColor="#202020"
                profileSrc={profileDark}
                isLogged={true}
            />
            <main className="profile">
                <h1 className="profile__title">Привет, {name}</h1>

                <form className="profile__form" onSubmit={handleSubmit}>
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
                            placeholder="Введите имя"
                        />
                    </span>
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
                            placeholder="Введите email"
                        />
                    </span>
                    <button type="submit" className="profile__submit">Редактировать</button>
                </form>
                <NavLink to="/" className="profile__link">
                    Выйти из аккаунта
                </NavLink>
            </main>
        </>
    );
}

export default Profile;