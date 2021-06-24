import { NavLink } from "react-router-dom";
import { startLogout } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import logoSantander from "../../assets/img/santander.png";
import { useTranslation } from "react-i18next";
import { ReduxState } from "../../interfaces/ReduxState";

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: ReduxState) => state.auth);
  const { t } = useTranslation("global");

  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid d-flex flex-direction-column align-items-center">
        <img
          className="logoNavBar navbar-brand ms-5 mb-2"
          src={logoSantander}
          alt="logo santander"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item navbar-text">
              <NavLink
                className="nav-link ms-5  active"
                aria-current="page"
                to="/"
              >
                {t("navbar.home")}
              </NavLink>
            </li>
            <li className="nav-item navbar-text">
              <NavLink className="nav-link ms-5  active" to="/invitations">
                {t("homePage.create-meetup")}
              </NavLink>
            </li>
            <li className="nav-item navbar-text">
              <NavLink className="nav-link ms-5 active" to="/list">
                {t("homePage.my-meetups")}
              </NavLink>
            </li>
          </ul>

          <ul className="nav justify-content-center align-items-center">
            <li className="nav-item  navbar-text name-online my-3">
              {t("navbar.online-user")}
              <span> {name?.charAt(0).toUpperCase() + name?.slice(1)}</span>
            </li>
            <button className="btn p-3" onClick={handleLogout}>
              {t("authPage.sign-out")}
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
