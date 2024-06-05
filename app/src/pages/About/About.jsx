import React from "react";
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.about}>
      <h1>Over Ons</h1>
      <p>
        Welkom bij De Bieren Vriend! Wij zijn gepassioneerd over het aanbieden
        van de beste dranken terwijl we bijdragen aan dierenwelzijn. Elke
        aankoop die u bij ons doet, helpt ons om een verschil te maken voor
        dieren in nood.
      </p>

      <h2>Onze Missie</h2>
      <p>
        Onze missie is om hoogwaardige dranken te leveren en tegelijkertijd een
        positieve impact te hebben op de wereld. Wij doneren een deel van onze
        opbrengsten aan organisaties die zich inzetten voor dierenwelzijn.
      </p>

      <h2>Ons Team</h2>
      <p>
        Het team van De Bieren Vriend bestaat uit toegewijde professionals die
        gepassioneerd zijn over dranken en dierenwelzijn. Wij werken hard om u
        de beste producten en service te bieden.
      </p>

      <h2>Contact</h2>
      <p>
        Heeft u vragen of opmerkingen? Neem gerust contact met ons op via
        support@debierenvriend.com of bel ons op +123 456 7890.
      </p>

      <h2>Volg Ons</h2>
      <p>
        Blijf op de hoogte van onze nieuwste producten en aanbiedingen door ons
        te volgen op sociale media.
      </p>
      <div className={style.socials}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/facebook.png`}
            alt="Facebook"
            className={style.social_icon}
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/twitter.png`}
            alt="Twitter"
            className={style.social_icon}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/instagram.png`}
            alt="Instagram"
            className={style.social_icon}
          />
        </a>
      </div>
    </div>
  );
};

export default About;
