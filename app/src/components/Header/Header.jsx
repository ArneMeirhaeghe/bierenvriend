import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import style from "./Header.module.css";
import ROUTES from "../../consts/Routes";
import { useProducts } from "../../contexts/ProductContext";

const Header = () => {
  const { authService, user } = useProducts();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  console.log(user);

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <Link to={ROUTES.home} className={style.header__title}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="logo"
            className={style.logo}
          />
        </Link>
        <div className={style.hamburger} onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
      <div
        className={`${style.header__welcome} ${menuOpen ? style.showMenu : ""}`}
      >
        {user ? (
          <div className={style.header__user}>
            Welcome {user.username}{" "}
            <span className={style.logout} onClick={authService.logout}>
              Logout
            </span>
          </div>
        ) : (
          <Link to={ROUTES.login} className={style.header__nav_link}>
            <img
              src={`${process.env.PUBLIC_URL}/profile.png`}
              alt="profile"
              className={style.subtle_logo}
            />
            <span className={style.subtle_icon_text}>Login</span>
          </Link>
        )}
        <nav className={style.header__nav}>
          {user && user.role === "verkoper" && (
            <Link
              to={ROUTES.VerkoperContainer}
              className={style.header__nav_link}
            >
              <img
                src={`${process.env.PUBLIC_URL}/admin.png`}
                alt="admin"
                className={style.logo}
              />
              <span className={style.icon_text}>Verkoper</span>
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link to={ROUTES.Admin} className={style.header__nav_link}>
              <img
                src={`${process.env.PUBLIC_URL}/admin.png`}
                alt="admin"
                className={style.logo}
              />
              <span className={style.icon_text}>Admin</span>
            </Link>
          )}
          {user && (
            <>
              <Link
                to={ROUTES.ShoppingContainer}
                className={style.header__nav_link}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/card.png`}
                  alt="card"
                  className={style.logo}
                />
                <span className={style.icon_text}>Shopping cart</span>
              </Link>
              <Link to={ROUTES.Profile} className={style.header__nav_link}>
                <img
                  src={`${process.env.PUBLIC_URL}/profile.png`}
                  alt="profile"
                  className={style.logo}
                />
                <span className={style.icon_text}>Profile</span>
              </Link>
              <Link to={ROUTES.favorite} className={style.header__nav_link}>
                <img
                  src={`${process.env.PUBLIC_URL}/fav.png`}
                  alt="fav"
                  className={style.logo}
                />
                <span className={style.icon_text}>Favorite</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
