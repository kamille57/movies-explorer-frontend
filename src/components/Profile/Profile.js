import React, { useState, useContext, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateProfile, signOut, serverError, setServerError, isLoading, isEditing, setIsEditing }) {
  const currentUser = useContext(CurrentUserContext);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    name: currentUser?.name,
    email: currentUser?.email,
  };

  const {
    values,
    errors,
    handleChange,
    validateForm,
    getInputProps,
  } = useForm(
    initialValues,
  );

  useEffect(function () {
    if (!currentUser) {
      navigate("/signup");
    }

  }, [currentUser, isEditing, navigate]);

  useEffect(function () {
    const isValuesChanged = values.name !== currentUser?.name || values.email !== currentUser?.email;
    if (isValuesChanged) {
      setIsDataChanged(true);
      setServerError(null);
    }
  }, [values, values.name, values.email, setServerError, currentUser?.name, currentUser?.email])


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, name } = values;
      onUpdateProfile({ email, name });
    }
  };

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
              id="email-error">{errors.email}
            </span>
          </fieldset>
          <span className={`profile__server-error ${serverError ? 'profile__server-error_active' : ''}`}>
            {serverError}
          </span>
          {isEditing || serverError ? (
            <button
              type="submit"
              disabled={!isDataChanged || errors.name || errors.email || serverError}
              className={`profile__submit ${!isDataChanged || errors.name || errors.email || serverError ? 'profile__submit_disabled' : ''}`}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
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
      </main >
    </>
  );
}
export default Profile;