import { ActionType, Types } from "../types/types";

const initialState = {
  usuarios: [],
};

export const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case Types.usersLoad:
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
};
