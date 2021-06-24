import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/ReduxState";
import { RegisteredUsers } from "../../../interfaces/User";
import { useTranslation } from "react-i18next";

interface Props {
  handleInviteUser: (email: string) => void;
  handleDeleteInvitation: (email: string) => void;
  invitations: string[];
  showInviteUsers: boolean;
  setshowInviteUsers: (prevState: boolean) => void;
}

export const MeetupsUsersList: React.FC<Props> = ({
  handleInviteUser,
  handleDeleteInvitation,
  invitations,
  showInviteUsers,
  setshowInviteUsers,
}) => {
  const { t } = useTranslation("global");
  const users = useSelector((state: ReduxState) => state.users.users);
  const activeUserEmail = useSelector((state: ReduxState) => state.auth.email);

  if (users) {
    return (
      <div className="col d-flex flex-column justify-content-center mt-md-5 mx-md-5 align-items-center animate__animated animate__fadeIn">
        <button
          className="btn btn-close-user-list align-self-center btn-invitar-personas mx-5 mb-3"
          onClick={(e) => {
            e.preventDefault();
            setshowInviteUsers(!showInviteUsers);
          }}
        >
          {t(`meetupsPage.close-guests-table`)}
        </button>
        <table className="table table-light table-striped table-hover lista-users">
          <thead className="text-center">
            <tr>
              <th>{t(`meetupsPage.guest-email`)}</th>
              <th>{t(`meetupsPage.guest-name`)}</th>
              <th>{t(`meetupsPage.guest-invitation`)}</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users
              ?.filter(
                (usuario: RegisteredUsers) => activeUserEmail !== usuario.email
              )
              .map((usuario: RegisteredUsers) => {
                return (
                  <tr key={usuario.email}>
                    <td>{usuario.email}</td>
                    <td>{usuario.name}</td>
                    <td>
                      {/* Si esta invitado, cambia el texto del boton*/}
                      {invitations.includes(usuario.email) ? (
                        <button
                          className="btn btn-success"
                          onClick={() => handleDeleteInvitation(usuario.email)}
                        >
                          {t(`meetupsPage.guest-cancel-invite`)}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleInviteUser(usuario.email)}
                        >
                          {t(`meetupsPage.guest-invite`)}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="col d-flex justify-content-center my-5 align-items-center text-danger display-5">
      <h1>Cargando Usuarios..</h1>
    </div>
  );
};
