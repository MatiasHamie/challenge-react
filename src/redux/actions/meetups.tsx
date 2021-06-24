import { db } from "../../firebase/firebase-config";

import { Types } from "../types/types";
import { Meetup } from "../../interfaces/Meetup";

import { getMeetupsFromFirebase } from "../../services/getMeetupsFromFirebase";
import { BirrasNecesarias } from "../../helpers/BirrasNecesarias";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const startNewMeetup = (newMeetup: Meetup) => {
  return async (dispatch: any) => {
    try {
      await db.collection(`meetups`).add(newMeetup);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "success",
        title: "Creacion Ok",
        text: "La meetup fue creada correctamente",
      });

      dispatch(startLoadingMeetups());
    } catch (error) {
      console.log(error);
    }
  };
};

export const startLoadingMeetups = () => {
  return async (dispatch: any) => {
    try {
      const meetups = await getMeetupsFromFirebase(); // cargame los meetups primero q hay en firebase
      dispatch(setMeetups(meetups as Meetup[])); // cambio el state
    } catch (error) {
      console.warn(error);
    }
  };
};

export const setMeetups = (meetups: Meetup[]) => ({
  type: Types.meetupsLoad,
  payload: meetups,
});

export const updateAddGuestFromMeetup = (
  meetup: Meetup,
  activeUserEmail: string,
  operationType: string
) => {
  // agrego o elimino al usuario segun quiera participar o no
  // actualizo valores

  const [birras, cajones] = BirrasNecesarias(meetup.temperatura, [
    ...meetup.invitados,
    activeUserEmail,
  ]);

  return async (dispatch: any) => {
    const meetupToFirestore = {
      ...meetup,
      invitados: [...meetup.invitados, activeUserEmail],
      birras,
      cajones,
    };

    await db.doc(`meetups/${meetup.id}`).update(meetupToFirestore);

    // actualizo solamente que quiero
    meetup.id && dispatch(refreshMeetup(meetupToFirestore));
    Swal.fire("Guardada", "Ya estas participando de la meetup", "success");
  };
};

export const updateRemoveGuestFromMeetup = (
  meetup: Meetup,
  activeUserEmail: string,
  operationType: string
) => {
  // agrego o elimino al usuario segun quiera participar o no
  // actualizo valores

  const [birras, cajones] = BirrasNecesarias(meetup.temperatura, [
    ...meetup.invitados.filter(
      (emailInvitado) => emailInvitado !== activeUserEmail
    ),
  ]);

  return async (dispatch: any) => {
    const meetupToFirestore = {
      ...meetup,
      invitados: meetup.invitados.filter(
        (existingEmailInFirebase) => existingEmailInFirebase !== activeUserEmail
      ),
      birras,
      cajones,
    };

    console.log("desde action-update-note", meetupToFirestore);
    await db.doc(`meetups/${meetup.id}`).update(meetupToFirestore);

    // actualizo solamente que quiero
    meetup.id && dispatch(refreshMeetup(meetupToFirestore));
    Swal.fire("Guardada", "Dejaste de participar de la meetup", "success");
  };
};

export const refreshMeetup = (meetup: Meetup) => ({
  type: Types.meetupUpdate,
  payload: {
    meetup: { ...meetup },
  },
});

export const startDeletingMeetup = (meetupId: string) => {
  return async (dispatch: any) => {
    await db.doc(`meetups/${meetupId}`).delete();

    dispatch(deleteNote(meetupId));
    dispatch(startLoadingMeetups());
  };
};

export const deleteNote = (id: string) => ({
  type: Types.meetupDeleted,
  payload: id,
});
