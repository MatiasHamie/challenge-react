import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { firebase } from "../firebase/firebase-config";

import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";
import { HomeScreen } from "../components/pages/home/HomeScreen";
import { startLoadingMeetups } from "../redux/actions/meetups";
import { getFromFirebaseIfIsActiveUserIsAdmin } from "../services/getUsersFromFirebase";

const AppRouter: React.FC = () => {
  const dispatch = useDispatch();
  // revisa el estado de login de firebase, cuando hay uid, esta logueado, habilito el router
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    // Mantener el usuario aunque recargue la pagina
    // observable de firebase que te dice cuando hay cambios en el login
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        getFromFirebaseIfIsActiveUserIsAdmin(
          user.email as string
        ).then((userType) => setIsAdmin(userType as string));
        dispatch(
          login(
            user.uid as string,
            user.email as string,
            user.displayName as string,
            isAdmin as string
          )
        );
        setIsLoggedIn(true);
        dispatch(startLoadingMeetups());
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn, isAdmin]);

  if (checking) {
    return (
      <div
        className="d-flex flex-column spinner-border text-danger align-items-center justify-content-center text-center"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/auth"
          isLoggedIn={isLoggedIn}
          component={AuthRouter}
        />

        <PrivateRoute path="/" isLoggedIn={isLoggedIn} component={HomeScreen} />

        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
