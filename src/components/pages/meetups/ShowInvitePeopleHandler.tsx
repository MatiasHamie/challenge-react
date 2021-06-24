import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  invitations: string[];
  showInviteUsers: boolean;
  setshowInviteUsers: (prevState: boolean) => void;
}

export const HandleInvitations: React.FC<Props> = ({
  invitations,
  showInviteUsers,
  setshowInviteUsers,
}) => {
  const { t } = useTranslation("global");
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <label className="form-label my-3">
          Personas invitadas:{" "}
          <span className="text-danger">{invitations.length}</span>
        </label>
        {!showInviteUsers && (
          <button
            className="btn btn-success align-self-center btn-invitar-personas mx-5"
            onClick={(e) => {
              e.preventDefault();
              setshowInviteUsers(!showInviteUsers);
            }}
          >
            {t(`meetupsPage.invitations`)}
          </button>
        )}
      </div>
    </>
  );
};
