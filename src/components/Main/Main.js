import React from 'react';
import Header from "../Header/Header.js"
import Promo from "../Promo/Promo.js"
import AboutProject from "../AboutProject/AboutProject.js"
import Techs from "../Techs/Techs.js"
import AboutMe from "../AboutMe/AboutMe.js"
import Portfolio from "../Portfolio/Portfolio.js"
import Footer from "../Footer/Footer.js"
import profile from "../../images/profile.svg"

function Main() {
    return (
        <>
            <Header
                backgroundColor="#073042"
                profileSrc={profile} />
            <main className="main">
                <section className="main-page">
                    <Promo />
                    <AboutProject />
                    <Techs />
                    <AboutMe />
                    <Portfolio />
                </section >
            </main>
            <Footer />
        </>
    );
}

export default Main;