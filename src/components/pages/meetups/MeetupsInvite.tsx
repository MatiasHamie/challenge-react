import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoadingUsers } from "../../../redux/actions/users";
import { MeetupsCreateForm } from "./MeetupsCreateForm";

export const MeetupsInvite = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // cargar usuarios al renderizar
    dispatch(startLoadingUsers());
  }, [dispatch]);

  return (
    <div className="row meetup-invite-body d-flex flex-wrap animate__animated animate__fadeIn">
      <MeetupsCreateForm />
    </div>
  );
};
