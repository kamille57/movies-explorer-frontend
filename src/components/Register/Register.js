import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth.js";
import MainApi from '../../utils/MainApi.js'

const api = new MainApi();

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  console.log('hello from Register');

  const handleRegister = (dataObj) => {
    // validation
    const userData = {...dataObj, ...values};
    setIsLoading(true);
    api.register(userData)
    .then(data => {
      console.log('Ответ с сервера:');
      console.log(data);
      setIsLoading(false);
    }, e => console.log(e))
   
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
    values,
    errors,
    getInputProps,
  } = useForm(initialValues, validate);

  return ( 
    <main className="register"> 
      <Auth 
        title="Добро пожаловать!" 
        name="registrationForm" 
        button={isLoading ? "Идет регистрация..." : "Зарегистрироваться"} 
        text="Уже зарегистрированы?" 
        span={ 
          <Link className="auth__confirm-link"to="/signin">Войти</Link> 
        } 
        handleSubmit={handleRegister} 
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
          placeholder="Введите ваше имя" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          {...getInputProps('name')} 
        /> 
        <span className="auth__error" id="name-error">{errors.name}</span> 
      </Auth> 
    </main> 
); 
} 

export default Register;