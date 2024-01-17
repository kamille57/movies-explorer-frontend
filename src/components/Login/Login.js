import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth.js";

//const api = new MainApi();

function Login({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (email, password) => {
    setIsLoading(true);
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
          <Link className="auth__confirm-link" to="/signup">
            Регистрация
          </Link>
        }
        handleSubmit={handleLogin}
      ></Auth>
    </main>
  );
}

export default Login;