// import React from "react";
// import { NavLink } from "react-router-dom";
// import Auth from "../Auth/Auth.js";

// function Login({ onLogin, isLoading }) {

//   const handleLogin = (email, password) => {
//     onLogin(email, password);
//   };
  
//   return (
//     <main className="login">
//       <Auth
//         title="Рады видеть!"
//         name="authorizationForm"
//         button={isLoading ? "Идет авторизация..." : "Войти"}
//         text="Ещё не зарегистрированы?"
//         span={
//           <NavLink className="auth__confirm-link" to="/signup">
//             Регистрация
//           </NavLink>
//         }
//         handleSubmit={handleLogin}
//         isRegistration={false}
//       ></Auth>
//     </main>
//   );
// }

// export default Login;