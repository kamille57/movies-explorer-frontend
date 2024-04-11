import React from 'react';
  
function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <span>&copy; 2023</span>
                <ul className="footer__links">
                    <li className="footer__link">
                        <a href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                        </li>
                    <li className="footer__link">
                        <a href="https://github.com/kamille57" target="_blank" rel="noopener noreferrer">Github</a>
                        </li>
                </ul>
            </div>
        </footer>
    );
}
  
export default Footer;