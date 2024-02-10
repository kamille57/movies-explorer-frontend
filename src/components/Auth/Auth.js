import React from 'react';
import { useForm } from '../../hooks/useForm';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';

function Auth({ title, name, button, text, span, isRegistration, handleSubmit }) {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const validate = (name, value) => {
        let error = '';

        if (name === 'email') {
            if (!value) {
                error = 'Поле E-mail обязательно для заполнения';
                document.getElementById('email').classList.add('auth__input_invalid');
            } else if (value.length < 3 || value.length > 64) {
                error = 'Поле E-mail должно быть длинее 3х символов и короче 64';
                document.getElementById('email').classList.add('auth__input_invalid');
            } else {
                document.getElementById('email').classList.remove('auth__input_invalid');
            }
        }

        if (name === 'password') {
            if (!value) {
                error = 'Поле Пароль обязательно для заполнения';
                document.getElementById('password').classList.add('auth__input_invalid');
            } else if (value.length < 6 && value.length > 64) {
                error = 'Поле Password должно быть длинее 6 и короче 64';
                document.getElementById('email').classList.add('auth__input_invalid');
            } else {
                document.getElementById('password').classList.remove('auth__input_invalid');
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

    const innerHandleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (isRegistration) {
                const { name, email, password } = values;
                handleSubmit({ name, email, password });
            } else {
                const { email, password } = values;
                handleSubmit({ email, password });
            }
        }
    };

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={innerHandleSubmit} id={`${name}Form`} name={name}>
                <img className="auth__logo" src={logo} alt="Логотип" onClick={() => navigate("/")}
                />
                <h1 className="auth__welcome">{title}</h1>
                <fieldset className="auth__fieldset">
                    { // ------------------------------------------------сюда добавил поле name
                        isRegistration && (
                            <>
                                <label className="auth__label" htmlFor="name">Имя:</label>
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
                    <button type="submit" aria-label={`кнопка сохранения ${name}`} className="auth__confirm-btn">
                        {button}
                    </button>
                    <p className="auth__confirm-text">{text}</p>
                    <span>{span}</span>
                </div>
            </form>
        </div>
    );
}

export default Auth;
