// import React from "react";
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

// const ProtectedRoute = ({ element: Component, ...props }) => {
//   return (
//     props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />
//   )
// }

function ProtectedRoute({ isLoggedIn, isLoading, Element, ...props }) {
    
    console.log("isLoading", isLoading);
    console.log("isLoggedIn", isLoggedIn);

    useEffect(() => {
        console.log('Re-render protected route ====================');
    }, [])

    useEffect(() => {
           
        console.log("useEffect - isLoading", isLoading);
        console.log("useEffect - isLoggedIn", isLoggedIn);
    }, [isLoading, isLoggedIn]);


    // TODO: проблема -при заходе на страницу, у нас состояние isLoading(false), из-за которого нас сразу редиретит
    // И, когда состояние isLoading(ТРУ), то мы уже находимся не тут, а в SingIN. А там не проверки и никому уже ничего не интересно. Т.е. нам надо каким-то образом понимать что сейчас у нас идёт загрузка, потому что иначе мы попадаем в СайнИн и больше ничего не происходит.

    // Я, Анастасия, ожидаю что после перезагрузки страницы у меня 
    // будет отображаться Movies, если в LS есть токен

    // Надо дождаться ответа от базы и узнать, залогинены мы или нет

    // 1. Preloader  - isLoading(true) isLoggedIn(true || ???)
    // 2. Element - isLoading(false) isLoggedIn(true) - OK
    // 3. Navigate - isLoading(false) isLoggedIn(false)
    // Navigate должен срабатывать, когда токена не существует 
    // Navigate не должен срабатывать если мы в состоянии загрузки

    return (
        isLoading ? <Preloader /> : (isLoggedIn ? <Element {...props} /> : <Navigate to="/signin" />)
    );
}

export default ProtectedRoute;