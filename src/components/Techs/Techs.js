import React from 'react';

function Techs() {
    const techsList = [
        'HTML',
        'CSS',
        'JS',
        'React',
        'Git',
        'Express.js',
        'mongoDB'
    ];

    return (
        <section className="techs">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__container-title">7 технологий</h3>
                <p className="techs__container-text">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className="techs__stacks">
                    {techsList.map((tech, index) => (
                        <li key={index} className="techs__stack">
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Techs;