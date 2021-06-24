import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { ReduxState } from "../../../../interfaces/ReduxState";
import { CardHeader } from "../../../ui/AuthCardHeader";
import { useForm } from "../../../../hooks/useForm";
import { startLoginEmailPassword } from "../../../../redux/actions/auth";
import { removeError, setError } from "../../../../redux/actions/ui";
import { IsFormValid } from "../../../../helpers/isFormValid";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

export const LoginScreen: React.FC = () => {
  // useTranslation(nombre de donde queremos sacar las traducciones, sin extension)
  const { t } = useTranslation("global");

  const dispatch = useDispatch();
  const { loading } = useSelector((state: ReduxState) => state.ui);
  const { msgError } = useSelector((state: ReduxState) => state.ui);

  const { email, password, onChangeForm, setState } = useForm({
    email: "",
    password: "",
  });

  const handleFillWithAdmin = () => {
    setState({ email: "admin@admin.com", password: "123456" });
  };
  const handleFillWithUser = () => {
    setState({ email: "usuario1@user.com", password: "123456" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = IsFormValid(email, password);

    if (typeof isValid === "boolean") {
      dispatch(startLoginEmailPassword(email, password));
      if (msgError) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: t(`authPage.errors.${msgError}`),
        });
      }

      dispatch(removeError());
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: t(isValid),
      });
      dispatch(setError(t(isValid)));
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card auth-card mb-3">
        <CardHeader />
        <div className="card-body">
          <p className="card-title text-center">Meetup App</p>
          <form onSubmit={handleSubmit}>
            <input
              id="nameInput"
              type="text"
              name="email"
              className="form-control"
              placeholder={t("authPage.enter-email")}
              value={email}
              onChange={({ target }) => onChangeForm(target.value, "email")}
            />
            <input
              id="passwordInput"
              type="password"
              name="password"
              className="form-control"
              placeholder={t("authPage.enter-password")}
              value={password}
              onChange={({ target }) => onChangeForm(target.value, "password")}
            />
            <button
              className="btn btn-danger text-center"
              disabled={loading as boolean}
            >
              {t("authPage.sign-in")}
            </button>
          </form>
        </div>
        <div className="card-footer">
          {t("authPage.dont-have-account")}
          <Link to="/auth/register" className="account">
            {t("authPage.sign-up")}
          </Link>

          <div className="d-flex btn-completar-form-login flex-column justify-content-center align-items-center flex-wrap">
            <h3 className="test-users text-center my-3">Usuarios de prueba</h3>
            <button className="btn-admin mb-3" onClick={handleFillWithAdmin}>
              {t("authPage.complete-with-admin")}
            </button>
            <button className="btn-user" onClick={handleFillWithUser}>
              {t("authPage.complete-with-user")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
