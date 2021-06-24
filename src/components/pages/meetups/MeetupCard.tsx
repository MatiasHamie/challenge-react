import React from "react";
import { Meetup } from "../../../interfaces/Meetup";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/ReduxState";
import { useTranslation } from "react-i18next";

interface Props {
  meetup: Meetup;
  handleUpdateMeetup: (
    meetupId: string,
    activeUserEmail: string,
    operationType: string
  ) => void;
  handleDeleteMeetup: (meetupId: string) => void;
}

export const MeetupCard: React.FC<Props> = ({
  meetup,
  handleUpdateMeetup,
  handleDeleteMeetup,
}) => {
  const { t } = useTranslation("global");
  const { email: activeUserEmail, name: activeUserName } = useSelector(
    (state: ReduxState) => state.auth
  );

  return (
    <div>
      <div
        className="card mx-2 my-2 d-flex flex-wrap flex-row align-items-center justify-content-center meetup-card"
        style={{
          width: "40rem",
          height: "30rem",
          borderRadius: "2rem",
          fontSize: "1.5rem",
        }}
      >
        <div
          className="card-body"
          style={{
            height: "80%",
            borderRadius: "2rem",
            fontSize: "1.5rem",
            letterSpacing: ".1rem",
          }}
        >
          {meetup.creadaPor === activeUserName ? (
            <div className="d-flex flex-row justify-content-between align-content-center">
              <h3 className="card-title ">
                <b>{t(`meetupsPage.meetupCard-created-by-me`)}</b>
              </h3>
              <i
                className="fas fa-trash-alt btn-eliminar-meetup"
                onClick={() => handleDeleteMeetup(meetup.id as string)}
              ></i>
            </div>
          ) : (
            <div className="d-flex flex-row justify-content-between align-content-center">
              <h3 className="card-title ">
                <b>
                  {t(`meetupsPage.meetupCard-created-by`)} {meetup.creadaPor}
                </b>
              </h3>
            </div>
          )}
          <p className="card-text">
            <b>{t(`meetupsPage.meetupCard-date`)} </b>
            {meetup.fecha}
          </p>
          <p className="card-text">
            <b>{t(`meetupsPage.meetupCard-address`)}</b>
            {meetup.direccion}
          </p>
          <p className="card-text">
            <b>{t(`meetupsPage.meetupCard-temperature`)}</b>
            {meetup.temperatura} &deg;
          </p>
          <p className="card-text">
            <b>{t(`meetupsPage.meetupCard-guests`)}</b>
            {meetup.invitados.length}
          </p>
          <p className="card-text">
            <b>{t(`meetupsPage.meetupCard-beers`)}</b>
            {meetup.birras}
          </p>
          <p className="card-text">
            <b>{t(`meetupsPage.meetupCard-boxes`)}</b>
            {meetup.cajones}
          </p>
        </div>

        {meetup.creadaPor === activeUserName ? (
          <div className="card-footer w-100 d-flex align-items-center justify-content-center">
            <button className="btn-creada-por-mi" disabled>
              {t(`meetupsPage.meetupCard-you-are-the-creator`)}
            </button>
          </div>
        ) : (
          <div className="card-footer w-100 d-flex align-items-center justify-content-center">
            {meetup.invitados.includes(activeUserEmail) ? (
              <button
                className="btn-participando"
                onClick={() =>
                  handleUpdateMeetup(
                    meetup.id as string,
                    activeUserEmail,
                    "remove-guest"
                  )
                }
              >
                {t(`meetupsPage.meetupCard-cancel-participate`)}
              </button>
            ) : (
              <button
                className="btn-participar"
                onClick={() =>
                  handleUpdateMeetup(
                    meetup.id as string,
                    activeUserEmail,
                    "add-guest"
                  )
                }
              >
                {t(`meetupsPage.meetupCard-participate`)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
