import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateProfile, signOut, serverError }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event) => { 
    const { name, value } = event.target; 
    if (name === "name") { 
      setName(value); 
    } else if (name === "email") { 
      setEmail(value); 
    } 
  
    if (value.trim() === "") {
      setIsSubmitDisabled(true); 
    } else {
      setIsSubmitDisabled(false); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateProfile({ email, name });
  };
  
  useEffect(function () {
    if (!currentUser) {
      navigate("/signup");
      setIsSubmitDisabled(true);
    } 
  }, [currentUser, isEditing, navigate]);

  return (
    <>
      <Header
        backgroundColor="#202020"
        profileSrc={profileDark}
        isLoggedIn={true}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
              placeholder="Введите email"
            />
          </span>
          {serverError && (
            <span className="profile__server-error">{serverError}</span>
          )}
          {isEditing ? (
            <button
              type="submit"
              className={`profile__submit ${isSubmitDisabled ? "profile__submit_disabled" : ""}`}
              onClick={() => {
                setIsEditing(false);
                setIsSubmitDisabled(true);
              }}
              disabled={isSubmitDisabled}
            >
              Сохранить
            </button>
          ) : (
            <button
              type="submit"
              className="profile__edit"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
          )}
        </form>
        {!isEditing && (
          <NavLink to="/" className="profile__link" onClick={signOut}>
            Выйти из аккаунта
          </NavLink>
        )}
      </main>
    </>
  );
}
export default Profile;