import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth.js";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <main className="login">
      <Auth
        title="Рады видеть!"
        name="authorizationForm"
        button={isLoading ? "Идет авторизация..." : "Войти"}
        text="Ещё не зарегистрированы?"
        span={
          <Link className="auth__confirm-link"to="/sign-up">Регистрация</Link>
        }
        onSubmit={handleLogin}
      >
      </Auth>
    </main>
  );
}

export default Login;