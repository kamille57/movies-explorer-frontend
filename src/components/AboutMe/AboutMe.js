import React from 'react';
import me from '../../images/me.jpg'

function AboutMe() {
    return (
        <section className="me">
            <h2 className="me__title">Студент</h2>
            <div className="me__container">
                <img className="me__img" src={me} alt="Фотография профиля." />
                <h3 className="me__container-title">Анастасия</h3>
                <h4 className="me__container-subtitle">Фронтенд-разработчик, 30 лет</h4>
                <p className="me__text">Привет! Я родилась в Орле, но живу и творю в Москве уже более десяти лет. Обожаю горные лыжи, читать и гулять. Об IT мире я мечтала еще со школьной скамьи, разные факторы мешали воплотить эту мечту в жизнь. Но настоящая любовь не знает преград.</p>
                <a className="me__link" href="https://github.com/kamille57" target="_blank" rel="noopener noreferrer">Github</a>
            </div>
        </section>
    );
}

export default AboutMe;