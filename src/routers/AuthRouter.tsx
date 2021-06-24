import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginScreen } from "../components/pages/auth/login/LoginScreen";
import { RegisterScreen } from "../components/pages/auth/register/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth-container">
      <Router>
        <Switch>
          <Route path="/auth/login" component={LoginScreen} />
          <Route path="/auth/register" component={RegisterScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    </div>
  );
};
