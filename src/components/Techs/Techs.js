import React from 'react';

function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__container-title">7 технологий</h3>
                <p className="techs__container-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="techs__stacks">
                    <div className="techs__stack">HTML</div>
                    <div className="techs__stack">CSS</div>
                    <div className="techs__stack">JS</div>
                    <div className="techs__stack">React</div>
                    <div className="techs__stack">Git</div>
                    <div className="techs__stack">Express.js</div>
                    <div className="techs__stack">mongoDB</div>
                </div>
            </div>
        </section>
    );
}

export default Techs;