import { RegisteredUsers } from "../../interfaces/User";
import { Meetup } from "../../interfaces/Meetup";
export enum Types {
  Login = "[Auth] Login",
  Logout = "[Auth] Logout",

  uiSetError = "[UI] Set Error",
  uiRemoveError = "[UI] Remove Error",

  uiStartLoading = "[UI] Start Loading",
  uiFinishLoading = "[UI] Finish Loading",

  userAddNew = "[Users] New User",
  usersLoad = "[Users] Load Users",

  meetupAddNew = "[Meetups] New Meetup",
  meetupsLoad = "[Meetups] Load Meetups",
  meetupUpdate = "[Meetups] Update Meetup",
  meetupDeleted = "[Meetups] Delete Meetup",
}

export type ActionType =
  | {
      type: Types.Login;
      payload: {
        uid: string;
        email: string;
        displayName: string;
        userType: string;
      };
    }
  | { type: Types.Logout }
  | { type: Types.uiSetError; payload: { msgError: string } }
  | { type: Types.uiRemoveError }
  | { type: Types.uiStartLoading }
  | { type: Types.uiFinishLoading }
  | { type: Types.userAddNew }
  | { type: Types.usersLoad; payload: [users: RegisteredUsers[]] }
  | { type: Types.meetupAddNew }
  | { type: Types.meetupsLoad; payload: [meetups: Meetup[]] }
  | { type: Types.meetupUpdate; payload: { meetup: Meetup } }
  | { type: Types.meetupDeleted; payload: { id: string } };
