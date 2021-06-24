import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/ReduxState";
import {
  updateAddGuestFromMeetup,
  updateRemoveGuestFromMeetup,
} from "../../../redux/actions/meetups";

import { Meetup } from "../../../interfaces/Meetup";

import { MeetupCard } from "./MeetupCard";
import { startDeletingMeetup } from "../../../redux/actions/meetups";

export const MeetupsList: React.FC = () => {
  const dispatch = useDispatch();
  const meetups = useSelector((state: ReduxState) => state.meetups.meetups);

  const handleUpdateMeetup = (
    meetupId: string,
    activeUserEmail: string,
    operationType: string
  ) => {
    const meetupToUpdate = meetups.filter(
      (meetup) => meetup.id === meetupId
    )[0];

    if (operationType === "add-guest") {
      dispatch(
        updateAddGuestFromMeetup(
          meetupToUpdate as Meetup,
          activeUserEmail,
          operationType
        )
      );
    } else {
      dispatch(
        updateRemoveGuestFromMeetup(
          meetupToUpdate as Meetup,
          activeUserEmail,
          operationType
        )
      );
    }
  };

  const handleDeleteMeetup = (meetupId: string) => {
    dispatch(startDeletingMeetup(meetupId));
  };

  return (
    <div className="row vw-100">
      <div className="col d-flex flex-wrap flex-row align-items-center justify-content-center animate__animated animate__fadeIn">
        {meetups?.map((meetup: Meetup) => {
          return (
            <MeetupCard
              key={Math.random()}
              meetup={meetup}
              handleUpdateMeetup={handleUpdateMeetup}
              handleDeleteMeetup={handleDeleteMeetup}
            />
          );
        })}
      </div>
    </div> 
  );
};
