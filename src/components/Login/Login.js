import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../Auth/Auth.js";
import MainApi from "../../utils/MainApi.js";

const api = new MainApi();

function Login({ setCurrentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Add the useNavigate hook

  const handleLogin = (dataObj) => {
    // validation 
    const userData = { ...dataObj };
    setIsLoading(true);
    api.authorize(userData)
      .then((data) => {
        console.log("Ответ с сервера:");
        console.log(data);
        setIsLoading(false);
        if(data !== undefined) {
          setCurrentUser(data);
        }
        navigate("/"); // Navigate to the main page
      });
  };

  return (
    <main className="login">
      <Auth
        title="Рады видеть!"
        name="authorizationForm"
        button={isLoading ? "Идет авторизация..." : "Войти"}
        text="Ещё не зарегистрированы?"
        span={
          <Link className="auth__confirm-link" to="/signup">
            Регистрация
          </Link>
        }
        handleSubmit={handleLogin} // Change the prop name here
      ></Auth>
    </main>
  );
}

export default Login;