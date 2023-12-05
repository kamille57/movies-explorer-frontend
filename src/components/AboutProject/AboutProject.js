import React from 'react';

function AboutProject() {
    return (
        <section className="about">
            <h2 className="about__title">О проекте</h2>
            <div className="about-columns-description">
                <div className="about-column-description">
                    <h3 className="about-column-description__title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-column-description__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-column-description">
                    <h3 className="about-column-description__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-column-description__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-columns-duration">
                <div className="about-columns-duration__scale about-columns-duration__scale_small">1 неделя</div>
                <div className="about-columns-duration__scale">4 недели</div>

                <div className="about-columns-duration__realm ">Back-end</div>
                <div className="about-columns-duration__realm">Front-end</div>
            </div>

        </section>
    );
}

export default AboutProject;