import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

import { ReduxState } from "../../../../interfaces/ReduxState";
import { startRegisterWithEmailPasswordName } from "../../../../redux/actions/auth";
import { removeError, setError } from "../../../../redux/actions/ui";

import { useForm } from "../../../../hooks/useForm";
import { useTranslation } from "react-i18next";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { IsFormValid } from "../../../../helpers/isFormValid";
import { CardHeader } from "../../../ui/AuthCardHeader";

const MySwal = withReactContent(Swal);

export const RegisterScreen: React.FC = () => {
  // useTranslation(nombre de donde queremos sacar las traducciones, sin extension)
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const { loading } = useSelector((state: ReduxState) => state.ui);

  const { email, password, password2, name, userType, onChangeForm } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
    userType: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = IsFormValid(email, password, name, password2);

    if (typeof isValid === "boolean") {
      dispatch(
        startRegisterWithEmailPasswordName(email, password, name, userType)
      );
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
      <div className="card auth-card my-auto">
        <CardHeader />
        <div className="card-body">
          <p className="card-title text-center">Meetup App</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder={t("authPage.enter-email")}
              value={email}
              onChange={({ target }) => onChangeForm(target.value, "email")}
            />
            <input
              type="text"
              className="form-control"
              placeholder={t("authPage.enter-name")}
              value={name}
              onChange={({ target }) => onChangeForm(target.value, "name")}
            />
            <input
              type="password"
              className="form-control"
              placeholder={t("authPage.enter-password")}
              value={password}
              onChange={({ target }) => onChangeForm(target.value, "password")}
            />
            <input
              type="password"
              className="form-control"
              placeholder={t("authPage.enter-password2")}
              value={password2}
              onChange={({ target }) => onChangeForm(target.value, "password2")}
            />

            <select
              className="w-100 form-control d-flex justify-content-center mb-4"
              name="userType"
              onChange={({ target }) => onChangeForm(target.value, "userType")}
            >
              <option value="">{t("authPage.enter-usertype")}</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            <button
              className="btn btn-danger text-center"
              disabled={loading as boolean}
            >
              {t("authPage.sign-up")}
            </button>
          </form>
        </div>
        <div className="card-footer">
          {t("authPage.already-have-account")}
          <Link to="/auth/login" className="account">
            {t("authPage.sign-in")}
          </Link>
        </div>
      </div>
    </div>
  );
};
