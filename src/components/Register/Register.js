import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth.js";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleRegister = () => {
    setIsLoading(true);
    // registration logic
    setIsLoading(false);
  };

  const initialValues = {
    name: "",
  };

  const validate = (name, value) => {
    let error = "";

    if (name === 'name') {
      if (!value) {
        error = 'Поле Имя обязательно для заполнения';
        document.getElementById('name').classList.add('auth__input_invalid');
      } else {
        document.getElementById('name').classList.remove('auth__input_invalid');
      }
    }

    return error;
  };

  const {
    errors,
    getInputProps,
  } = useForm(initialValues, validate);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  return (
      <main className="register">
        <Auth
          title="Добро пожаловать!"
          name="registrationForm"
          button={isLoading ? "Идет регистрация..." : "Зарегистрироваться"}
          text="Уже зарегистрированы?"
          span={
            <Link className="auth__confirm-link"to="/sign-in">Войти</Link>
          }
          onSubmit={handleRegister}
        >
          <label className="auth__label" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            className="auth__input"
            name="name"
            id="name"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
            {...getInputProps('name')}
          />
          <span className="auth__error" id="name-error">{errors.name}</span>
        </Auth>
      </main>
  );
}

export default Register;