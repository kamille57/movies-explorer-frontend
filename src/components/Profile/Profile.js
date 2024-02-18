import React, { useState, useContext, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateProfile, signOut, serverError, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    name: currentUser?.name,
    email: currentUser?.email,
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
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Некорректный адрес электронной почты';
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
  const isDataChanged = values.name !== currentUser?.name || values.email !== currentUser?.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, name } = values;
      onUpdateProfile({ email, name });
    }
  };

  useEffect(function () {
    if (!currentUser) {
      navigate("/signup");
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
        <h1 className="profile__title">Привет, {values.name}</h1>

        <form className="profile__form"
          onSubmit={handleSubmit}

        >
          <fieldset className="profile__input-text">Имя
            <label className="profile__label" htmlFor="name"></label>
            <input
              type="text"
              className="profile__input"
              name="name"
              id="name"
              minLength="2"
              maxLength="40"
              value={values.name}
              onChange={handleChange}

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
              value={values.email}
              {...getInputProps('email')}
              disabled={!isEditing}
              onChange={handleChange}

              placeholder="Введите email"
            />
            <span className={`profile__error ${errors.email ? 'profile__error_active' : ''}`}
              id="name-error">{errors.email}
            </span>
          </fieldset>
          {serverError && (
            <span className="profile__server-error">{serverError}</span>
          )}
          {isEditing ? (
            <button
              type="submit"
              disabled={!isDataChanged || errors.name || errors.email || serverError} 
              onClick={() => setIsEditing(false)}
              className={`profile__submit ${!isDataChanged || errors.name || errors.email ? 'profile__submit_disabled' : ''}`}
            >
              {console.log("isEditing", isEditing)}
              {console.log("isDataChanged", isDataChanged)}
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          ) : (
            <button
              type="submit"
              className="profile__edit"
              onClick={() => setIsEditing(true)
              }
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