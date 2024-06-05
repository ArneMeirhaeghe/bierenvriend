import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import style from "./Footer.module.css";
import ROUTES from "../../consts/Routes";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__content}>
        <div className={style.footer__section}>
          <h4>About Us</h4>
          <p>
            We bieden de beste dranken en doneren een deel van de opbrengst aan
            dierenwelzijn. Drink en steun dieren!
          </p>
        </div>
        <div className={style.footer__section}>
          <h4>Contact Us</h4>
          <p>Email: support@company.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className={style.footer__section}>
          <h4>Follow Us</h4>
          <div className={style.footer__socials}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.social_icon}
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.social_icon}
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.social_icon}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className={style.footer__section}>
          <h4>Quick Links</h4>
          <nav className={style.footer__nav}>
            <Link to={ROUTES.home} className={style.footer__nav_link}>
              Home
            </Link>
            <Link to={ROUTES.about} className={style.footer__nav_link}>
              About
            </Link>
            <Link to={ROUTES.PrivacyPolicy} className={style.footer__nav_link}>
              Privacy Policy
            </Link>
            <Link to={ROUTES.terms} className={style.footer__nav_link}>
              Terms of Service
            </Link>
            <Link
              to={ROUTES.VerkoperContainer}
              className={style.footer__nav_link}
            >
              Verkoper
            </Link>
            <Link
              to={ROUTES.ShoppingContainer}
              className={style.footer__nav_link}
            >
              Shopping cart
            </Link>
            <Link to={ROUTES.Profile} className={style.footer__nav_link}>
              Profile
            </Link>
            <Link to={ROUTES.favorite} className={style.footer__nav_link}>
              Favorite
            </Link>
          </nav>
        </div>
      </div>
      <div className={style.footer__bottom}>
        <p>&copy; 2024 De Bieren Vriend. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
