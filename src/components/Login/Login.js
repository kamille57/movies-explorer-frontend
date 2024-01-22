import React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../Auth/Auth.js";

//const api = new MainApi();

function Login({ onLogin, isLoading }) {

  const handleLogin = (email, password) => {
    onLogin(email, password);
  };
  // const navigate = useNavigate(); // Add the useNavigate hook

  // const handleLogin = () => {
  //   // validation 
  //   const userData = { ...dataObj };
  // setIsLoading(true);
  //   api.authorize(userData)
  //     .then((data) => {
  //       console.log("ответ с сервера", data);
  //       setIsLoading(false);
  //       if(data !== undefined) {
  //         setCurrentUser(data);
  //       }
  //       navigate("/"); // Navigate to the main page
  //     });
  // };

  return (
    <main className="login">
      <Auth
        title="Рады видеть!"
        name="authorizationForm"
        button={isLoading ? "Идет авторизация..." : "Войти"}
        text="Ещё не зарегистрированы?"
        span={
          <NavLink className="auth__confirm-link" to="/signup">
            Регистрация
          </NavLink>
        }
        handleSubmit={handleLogin}
        isRegistration={false}
      ></Auth>
    </main>
  );
}

export default Login;