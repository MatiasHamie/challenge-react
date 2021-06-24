import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { IProps } from "../interfaces/routes";

/**
 * Similar a un guardian de Angular
 * @param {isAutenthicated} usuario logueado si/no
 * @param {component} componente componente a renderizar
 * @param {...rest} rest resto de informacion, exact, path, etc.
 *
 */
export const PrivateRoute = ({
  isLoggedIn,
  component: Component,
  ...rest
}: IProps) => {
  return isLoggedIn ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/auth/login" />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
