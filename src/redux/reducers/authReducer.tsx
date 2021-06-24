import { ActionType, Types } from "../types/types";

export const authReducer = (state = {}, action: ActionType) => {
  switch (action.type) {
    case Types.Login:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.displayName,
        userType: action.payload.userType,
      };

    case Types.Logout:
      return {};

    default:
      return state;
  }
};
