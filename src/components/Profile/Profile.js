import React, { useState, useContext, useEffect, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateProfile, signOut, serverError, isSaveBtnDisabled }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  const initialValues = {
    name: name,
    email: email,
  };

  const validate = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (!value) {
        error = 'Поле Имя обязательно для заполнения';
      } else if (value.length < 2 || value.length > 32) {
        error = 'Поле Имя должно быть длинее 2х символов и короче 32';
      }
    }

    if (name === 'email') {
      if (!value) {
        error = 'Поле E-mail обязательно для заполнения';
      } else if (value.length < 3 || value.length > 64) {
        error = 'Поле E-mail должно быть длинее 3х символов и короче 64';
      }
    }

    return error;
  };

  const {
    values,
    errors,
    handleChange,
    validateForm,
    getInputProps,
  } = useForm(
    initialValues,
    validate
  );


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
    if (validateForm()) {
      const { email, name } = values;
      onUpdateProfile({ email, name });
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onUpdateProfile({ email, name });
  // };

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
          <fieldset className="profile__input-text">Имя
            <label className="profile__label" htmlFor="name"></label>
            <input
              type="text"
              className="profile__input"
              name="name"
              id="name"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.name}
              {...getInputProps('name')}
              disabled={!isEditing}
              placeholder="Введите имя"
            />
            <span className={`profile__error ${errors.name ? 'profile__error_active' : ''}`}
              id="name-error">{errors.name}
            </span>
          </fieldset>
          <fieldset className="profile__input-text">E-mail
            <label className="profile__label" htmlFor="email"></label>
            <input
              className="profile__input"
              required
              name="email"
              type="email"
              id="email"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.email}
              {...getInputProps('email')}
              disabled={!isEditing}
              placeholder="Введите email"
            />
            <span className={`profile__error ${errors.email ? 'profile__error_active' : ''}`}
              id="name-error">{errors.email}
            </span>
          </fieldset>

          {/* 
            1. Если серверная ошибка есть, то показываем кнопку ошибку И СОХРАНИТЬ 
            2. Иначе (ошибки нет), показыаем редактировать и выйти
          */}
          {serverError && (
            <span className="profile__server-error">{serverError}</span>
          )}



          {isEditing || serverError ? (
            <button
              type="submit"
              className={`profile__submit ${isSubmitDisabled ? "profile__submit_disabled" : ""}`}
              onClick={() => {
                // TODO: пишите инструкци к тому что должно происходить с isEditing в зависимости от isSaveBtnDisabled
                // isEditing - true и serverError false = submit активен
                // isEditing - true и serverError true = submit неактивен
                // isEditing - false и serverError true = submit активен
                // isEditing - false и serverError false = submit неактивен
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
        {!isEditing && !serverError && (
          <NavLink to="/" className="profile__link" onClick={signOut}>
            Выйти из аккаунта
          </NavLink>
        )}
      </main>
    </>
  );
}
export default Profile;