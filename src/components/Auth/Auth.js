import React from 'react';
import { useForm } from '../../hooks/useForm';
import logo from '../../images/logo.svg';

function Auth({ title, name, button, text, span, children }) {
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
            } else {
                document.getElementById('email').classList.remove('auth__input_invalid');
            }
        }

        if (name === 'password') {
            if (!value) {
                error = 'Поле Пароль обязательно для заполнения';
                document.getElementById('password').classList.add('auth__input_invalid');
            } else {
                document.getElementById('password').classList.remove('auth__input_invalid');
            }
        }

        return error;
    };

    const {
        errors,
        handleChange,
        validateForm,
        getInputProps,
    } = useForm(
        initialValues,
        validate
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
        }
    };

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit} id={`${name}Form`} name={name}>
                <img className="auth__logo" src={logo} alt="Логотип" />
                <h2 className="auth__welcome">{title}</h2>
                <fieldset className="auth__fieldset">
                    {children}
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
                        {...getInputProps('email')}
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
                        {...getInputProps('password')}
                    />
                    <span className="auth__error" id="password-error">{errors.password}</span>
                </fieldset>
            </form>
            <div className="auth__confirm">
                <button type="submit" aria-label={`кнопка сохранения ${name}`} className="auth__confirm-btn">
                    {button}
                </button>
                <p className="auth__confirm-text">{text}</p>
                <span>{span}</span>
            </div>
        </div>
    );
}

export default Auth;
