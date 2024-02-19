import React, { useState, useContext, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import profileDark from "../../images/profileDark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateProfile, signOut, serverError, setServerError, isEditing, setIsEditing, isLoading }) {
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
    console.log('isEditing', isEditing);

  }, [currentUser, isEditing, navigate]);

  useEffect(function () {
    console.log('Зарегистрирована попытка изменения values');
    const isValuesChanged = values.name !== currentUser?.name || values.email !== currentUser?.email;
    if (isValuesChanged) {
      console.log('Данные поменялись, поэтому убираем серверную ошибку');
      setIsDataChanged(true);
      setServerError(null);
    }
  }, [values, values.name, values.email, setServerError, currentUser?.name, currentUser?.email])


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, name } = values;
      onUpdateProfile({ email, name });
      setIsEditing(true)
      console.log('isEditing', isEditing);
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

          {/* Как должна выглядеть страница после того как пришла ошибка от сервера? */}
          {/* 1. Показываем текст ошибки (от сервера) */}
          {/* 2. Неактивная кнопка сохранить */}


          {/* Что происходит после начала редактирования? */}
          {/* Как узнать что у нас началось начало редактирования? - редактирование началось когда поменялись "values, values.name, values.email" */}
          {/* 0. Скрываем текст ошибки (от сервера) - serverError переводим в состояние false */}
          {/* 1. Кнопка сохранить становится активной (убираем disabled) */}


          {/* Для того чтобы начать редактировать, нужно войти в режим редактирования (isEditing == true) */}

          {/* Как войти в режим редактирования? */}
          {/* 1. Обычный способ - нажать кнопку редактировать */}
          {/* 2. Никак, только способ 1 */}

          {/* Как ВЫЙТИ из режима редактирования? */}
          {/*  1. Обычный способ - нажать СОХРАНИТЬ и при этом НЕ получить ошибку сервера */}

          {/* Как разблокировать кнопку сохранить? */}
          {/* 1. (После того как сервер прислал ошибку,) начинаем менять имя или почту в полях ввода  */}


          {/* После отправки данных на сервер, мы должны выйти из режима редактирвоания, НО
          мы вернемся в его если есть ошибка от сервера */}

          {/* После отправки данных  на сервере, мы выходим из режима редактирвоания ТОЛЬКО ЕСЛИ ошибки нет */}



          <span className={`profile__server-error ${serverError ? 'profile__server-error_active' : ''}`}>
            {serverError}
          </span>

          {isEditing ? (
            <button
              type="submit"
              disabled={!isDataChanged || errors.name || errors.email || serverError}
              className={`profile__submit ${!isDataChanged || errors.name || errors.email || serverError ? 'profile__submit_disabled' : ''}`}
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