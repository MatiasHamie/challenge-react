import { Types } from "../types/types";
import { RegisteredUsers } from "../../interfaces/User";
import { getUsersFromFirebase } from "../../services/getUsersFromFirebase";

export const startLoadingUsers = () => {
  return async (dispatch: any) => {
    try {
      const users = await getUsersFromFirebase(); // cargo usuarios de firebase
      dispatch(setUsers(users as RegisteredUsers[])); // actualizo state
    } catch (error) {
      console.warn(error);
    }
  };
};

export const setUsers = (users: RegisteredUsers[]) => ({
  type: Types.usersLoad,
  payload: users,
});
