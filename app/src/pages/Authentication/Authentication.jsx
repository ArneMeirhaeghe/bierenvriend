import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import Home from "../Home/Home";
import LoginAndRegister from "../Login/LoginAndRegister";
import Favorites from "../Favorites/Favorites";
import ShoppingContainer from "../ShoppingContainer/ShoppingContainer";
import Detail from "../Detail/Detail";
import Admin from "../Admin/Admin";
import VerkoperContainer from "../Verkoper/VerkoperContainer";
import Profile from "../Profile/Profile";
import { useProducts } from "../../contexts/ProductContext";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../TermsOfService/TermsOfService";
import About from "../About/About";
import NotFound from "../Notfound/NotFound";

const Authentication = () => {
  const { authService } = useProducts();

  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route
        path={ROUTES.login}
        element={<LoginAndRegister authService={authService} />}
      />
      <Route
        path={ROUTES.favorite}
        authService={authService}
        element={<Favorites />}
      />
      <Route
        path={ROUTES.ShoppingContainer}
        authService={authService}
        element={<ShoppingContainer />}
      />
      <Route path={ROUTES.detail.path} element={<Detail />} />
      <Route path={ROUTES.Admin} element={<Admin />} />
      <Route path={ROUTES.VerkoperContainer} element={<VerkoperContainer />} />
      <Route path={ROUTES.Profile} element={<Profile />} />
      <Route path={ROUTES.PrivacyPolicy} element={<PrivacyPolicy />} />
      <Route path={ROUTES.terms} element={<TermsOfService />} />
      <Route path={ROUTES.about} element={<About />} />
      <Route path={ROUTES.notfound} element={<NotFound />} />
    </Routes>
  );
};

export default Authentication;
