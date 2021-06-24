import { RegisteredUsers } from "./User";
import { Meetup } from "./Meetup";
export interface ReduxState {
  auth: { uid: string; email: string; name: string; userType: string };
  ui: { loading: boolean; msgError: string };
  users: { users: RegisteredUsers[]; active: boolean };
  meetups: { meetups: Meetup[]; active: boolean };
}
