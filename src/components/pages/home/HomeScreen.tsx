import { NavBar } from "../../ui/NavBar";
import { HomeCardsOptions } from "./HomeCardsOptions";
import { Switch, Route } from "react-router-dom";
import { MeetupsList } from "../meetups/MeetupsList";
import { MeetupsInvite } from "../meetups/MeetupsInvite";

export const HomeScreen = () => {
  return (
    <div className="home-body">
      <NavBar />
      <HomeCardsOptions />

      <Switch>
        <Route path="/invitations" component={MeetupsInvite} />
        <Route path="/list" component={MeetupsList} />
      </Switch>
    </div>
  );
};
