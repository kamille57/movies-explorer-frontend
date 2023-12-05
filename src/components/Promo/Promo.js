import React from 'react';
import promo from '../../images/promo.svg'

function Promo() {
    const handleScroll = () => {
        const section = document.querySelector('.about');
        section.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <section className="promo">
            <img className="promo__img" src={promo} alt="Информационный мир." />
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8288;&#8211;&#8288;разработки.</h1>
                <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button type="submit" className="promo__btn" onClick={handleScroll}>Узнать больше</button>
            </div>
        </section>
    );
}

export default Promo;