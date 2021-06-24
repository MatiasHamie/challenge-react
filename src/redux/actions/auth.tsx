import { Types } from "../types/types";
import { db, firebase } from "../../firebase/firebase-config";
import { startLoading, finishLoading, setError } from "./ui";

export const login = (
  uid: string,
  email: string,
  displayName: string,
  userType?: string
) => {
  return {
    type: Types.Login,
    payload: {
      uid,
      email,
      displayName,
      userType,
    },
  };
};

export const startLogout = () => {
  return (dispatch: any) => {
    firebase.auth().signOut().catch(console.warn);
    dispatch(logout());
  };
};

export const logout = () => {
  return {
    type: Types.Logout,
  };
};

export const startLoginEmailPassword = (email: string, password: string) => {
  //Corregir este any mas adelante
  return (dispatch: any) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(finishLoading());
        dispatch(
          login(
            user?.uid as string,
            email as string,
            user?.displayName as string
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError(err.code));
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPasswordName = (
  email: string,
  password: string,
  name: string,
  userType: string
) => {
  return (dispatch: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user
          ?.updateProfile({ displayName: name })
          .then((resp) => {
            dispatch(
              login(
                user?.uid as string,
                email as string,
                user?.displayName as string,
                userType as string
              )
            );
            db.collection(`users`).add({ email, name, userType }); //agrego a firestore
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
