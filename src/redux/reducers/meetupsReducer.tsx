import { ActionType, Types } from "../types/types";
import { Meetup } from "../../interfaces/Meetup";

const initialState = {
  meetups: [],
};

export const meetupsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case Types.meetupsLoad:
      return {
        ...state,
        meetups: [...action.payload],
      };
    case Types.meetupUpdate:
      return {
        ...state,
        meetups: state.meetups.map((meetup: Meetup) =>
          meetup.id === action.payload.meetup.id
            ? action.payload.meetup
            : meetup
        ),
      };
    case Types.meetupDeleted:
      console.log("state", state);
      console.log("action-payload",action.payload);

      return {
        ...state,
        meetups: state.meetups.filter(
          (meetup: Meetup) => meetup.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
