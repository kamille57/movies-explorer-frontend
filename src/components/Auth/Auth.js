import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import logo from '../../images/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';

function Auth({ name, isRegistration, onRegister, onLogin, serverMessage, setServerMessage }) {
    const navigate = useNavigate();
    const [isDataChanged, setIsDataChanged] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
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
        const isValuesChanged = values.email !== initialValues.email && values.password !== initialValues.password;
        const isNameChanged = values.name !== initialValues.name;
        if (!isRegistration && isValuesChanged) {
            setIsDataChanged(true);
            setServerMessage(null);
        } else if (isRegistration && isValuesChanged && isNameChanged) {
            setIsDataChanged(true);
            setServerMessage(null);
        }

    }, [values, values.name, values.email, values.password, initialValues.name, initialValues.email, initialValues.password])


    const handleRegister = ({ name, email, password }) => {
        onRegister({ name, email, password });
    }

    const handleLogin = (email, password) => {
        onLogin(email, password);
    };

    const innerHandleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (isRegistration) {
                const { name, email, password } = values;
                handleRegister({ name, email, password });
            } else {
            }
        } else {
            const { email, password } = values;
            handleLogin({ email, password });
        }
    };

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={innerHandleSubmit} id={`${name}Form`} name={name}>
                <img className="auth__logo" src={logo} alt="Логотип" onClick={() => navigate("/")} />
                {isRegistration ?
                    <h1 className="auth__welcome">Регистрация</h1>
                    :
                    <h1 className="auth__welcome">Добро пожаловать!</h1>}
                <fieldset className="auth__fieldset">
                    {isRegistration && (
                        <>
                            <label className="auth__label" htmlFor="name">Имя:
                            </label>
                            <input
                                className="auth__input"
                                required
                                name="name"
                                type="text"
                                id="name"
                                onChange={handleChange}
                                value={values.name}
                                {...getInputProps('name')}
                                placeholder="Введите ваше имя"
                            />
                            <span className="auth__error" id="name-error">{errors.name}</span>
                        </>
                    )
                    }
                    <label className="auth__label" htmlFor="email">
                        E-mail:
                    </label>
                    <input
                        className="auth__input"
                        required
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                        {...getInputProps('email')}
                        placeholder="Введите ваш email"
                    />
                    <span className="auth__error" id="email-error">{errors.email}</span>
                    <label className="auth__label" htmlFor="password">
                        Пароль:
                    </label>
                    <input
                        className="auth__input"
                        required
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}

                        {...getInputProps('password')}
                        placeholder="Введите ваш пароль"
                    />
                    <span className="auth__error" id="password-error">{errors.password}</span>
                </fieldset>
                <div className="auth__confirm">
                    {isRegistration ? (
                        <>
                            <button
                                type="submit"
                                disabled={!isDataChanged || errors.name || errors.email || errors.password || serverMessage}
                                aria-label={`кнопка сохранения ${name}`}
                                className={`auth__confirm-btn ${!isDataChanged || errors.name || errors.email || errors.password || serverMessage ? 'profile__submit_disabled' : ''}`}
                            >
                                Регистрация
                            </button>
                            <p className="auth__confirm-text">Уже зарегистрированы?</p>
                            <span>
                                <NavLink className="auth__confirm-link" to="/signin" onClick={() => navigate("/signin")} >
                                    Войти
                                </NavLink>
                            </span>
                        </>
                    ) : (
                        <>
                            <button
                                type="submit"
                                disabled={!isDataChanged || errors.email || errors.password || serverMessage}
                                aria-label={`кнопка сохранения ${name}`}
                                className={`auth__confirm-btn ${!isDataChanged || errors.email || errors.password || serverMessage ? 'profile__submit_disabled' : ''}`}
                            >
                                Войти
                            </button>
                            <p className="auth__confirm-text">Ещё не зарегистрированы?</p>
                            <span>
                                <NavLink className="auth__confirm-link" to="/signup">
                                    Регистрация
                                </NavLink>
                            </span>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Auth;
