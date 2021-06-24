import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";

export const HomeCardsOptions: React.FC = () => {
  const history = useHistory();

  const { t } = useTranslation("global");

  return (
    <div
      className={`d-flex ${
        history.location.pathname !== "/"
          ? "child-component-rendered"
          : "child-component-not-rendered"
      }`}
    >
      <div
        className={`row d-flex flex-sm-wrap justify-content-center align-items-center py-md-3 py-1 vw-100`}
      >
        {history.location.pathname !== "/list" && (
          <div className={`col d-flex justify-content-center`}>
            <NavLink className="nav-link" to="/invitations">
              <div className="card menuOpt meetup-create mx-md-auto my-5 card-cover text-white rounded-5">
                <h2 className="m-auto card-opt-title text-center fw-bold">
                  {t("homePage.create-meetup").toUpperCase()}
                </h2>
              </div>
            </NavLink>
          </div>
        )}

        {history.location.pathname !== "/invitations" && (
          <div className={`col d-flex justify-content-center`}>
            <NavLink className="nav-link" to="/list">
              <div className="card menuOpt meetup-list mx-md-auto my-5 card-cover text-white rounded-5">
                <h2 className="m-auto card-opt-title text-center fw-bold">
                  {t("homePage.my-meetups").toUpperCase()}
                </h2>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
