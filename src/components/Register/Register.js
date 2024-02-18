// import React from "react";
// //import { useForm } from "../../hooks/useForm";
// import { NavLink, useNavigate } from "react-router-dom";
// import Auth from "../Auth/Auth.js";

// function Register({ onRegister, isLoading }) {
//   const navigate = useNavigate();


//   // const initialValues = {
//   //   name: "",
//   // };

//   // const { values, errors, getInputProps, setValues } = useForm(
//   //   initialValues,
//   //   validate
//   // );

//   // function handleChange(e) {
//   //   const { name, value } = e.target;

//   //   setValues((prevValues) => ({
//   //     ...prevValues,
//   //     [name]: value,
//   //   }));
//   // }

  
//   const handleRegister = ({ name, email, password }) => {
//     console.log({ name, email, password });
//     onRegister({ name, email, password });
//   }


//     // if (name === "name") {
//     //   if (!value) {
//     //     error = "Поле Имя обязательно для заполнения";
//     //     document.getElementById("name").classList.add("auth__input_invalid");
//     //   } else {
//     //     document
//     //       .getElementById("name")
//     //       .classList.remove("auth__input_invalid");
//     //   }
//     // }

//   //   return error;
//   // }

//   return (
//     <main className="register">
      
//       <Auth
//         title="Добро пожаловать!"
//         name="registrationForm"
//         text="Уже зарегистрированы?"
//         button={isLoading ? "Идет авторизация..." : "Регистрация"}
//         isRegistration={true}
//         span={
//           <NavLink className="auth__confirm-link" to="/signin" onClick={()=>navigate("/signin")} >
//             Войти
//           </NavLink>
//         }
//         handleSubmit={handleRegister}
//       >
//         {/* <label className="auth__label" htmlFor="name">
//           Имя
//         </label> */}
//         {/* <input
//           type="text"
//           className="auth__input"
//           name="name"
//           id="name"
//           minLength="2"
//           maxLength="40"
//           required
//           placeholder="Введите ваше имя"
//           value={values.name}
//           onChange={handleChange}
//           {...getInputProps("name")}
//         /> */}
//         {/* <span className="auth__error" id="name-error">
//           {errors.name}
//         </span> */}
//       </Auth>
//     </main>
//   );
// }

// export default Register;

