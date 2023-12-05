import React from 'react';

function Footer() {
    return (
        <section className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <span>&copy; 2023</span>
                <div className="footer__links">
                    <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/kamille57" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </section>
    );
}

export default Footer;