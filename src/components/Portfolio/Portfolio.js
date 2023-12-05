import React from 'react';
import arrow from '../../images/arrow.svg'

function Portfolio() {
    return (
        <section className="portfolio" id='portfolio'>
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__container">
                <a className="portfolio__link" href="https://github.com/kamille57" target="_blank" rel="noopener noreferrer">Статичный сайт<img className="portfolio__img" src={arrow} alt="Стрелка." />
                </a>
                <a className="portfolio__link" href="https://github.com/kamille57" target="_blank" rel="noopener noreferrer">Адаптивный сайт<img className="portfolio__img" src={arrow} alt="Стрелка." />
                </a>
                <a className="portfolio__link" href="https://github.com/kamille57" target="_blank" rel="noopener noreferrer">Одностраничное приложение<img className="portfolio__img" src={arrow} alt="Стрелка." />
                </a>
            </div>
        </section>
    );
}

export default Portfolio;