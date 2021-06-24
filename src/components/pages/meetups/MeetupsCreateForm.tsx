import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useTranslation } from "react-i18next";

// redux
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../../interfaces/ReduxState";
import { startNewMeetup } from "../../../redux/actions/meetups";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../../redux/actions/ui";

// interfaces
import { Direcciones } from "../../../interfaces/Addresses";

// Helpers
import { IsMeetupFormValid } from "../../../helpers/isFormValid";
import { removeDuplicates } from "../../../helpers/removeDuplicates";
import { BirrasNecesarias } from "../../../helpers/BirrasNecesarias";
import { areInputsValid } from "../../../helpers/isFormValid";
import moment from "moment";

// services
import { getAddressLatLon } from "../../../services/getAddressLatLon";
import { getTemperature } from "../../../services/getTemperature";

// modal error
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { MeetupsUsersList } from "./MeetupsUsersList";
import { BirrasAndTempPreview } from "./BirrasAndTempPreview";
import { PickDateAndTimeInputs } from "./PickDateAndTimeInputs";
import { PickStreetAndHouseNumber } from "./PickStreetAndHouseNumber";
import { ValidateAndPickFinalAddress } from "./ValidateAndPickFinalAddress";
import { HandleInvitations } from "./ShowInvitePeopleHandler";

const MySwal = withReactContent(Swal);

export const MeetupsCreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const { name: userName, userType } = useSelector(
    (state: ReduxState) => state.auth
  );
  const isLoading = useSelector((state: ReduxState) => state.ui.loading);

  const [showInviteUsers, setshowInviteUsers] = useState(false);
  const [datePickedUpByUser, setdatePickedUpByUser] = useState<string>();
  const [addressPickedUpByUser, setaddressPickedUpByUser] = useState<{
    calle: string;
    altura: string;
    localidad: string;
  }>();
  const [adresses, setAdresses] = useState<Direcciones[]>();
  const [temperatura, setTemperatura] = useState<number>();
  const [invitations, setInvitations] = useState<string[]>([]);

  const { fecha, calle, altura, hora, minuto, onChangeForm } = useForm({
    fecha: "",
    hora: "",
    minuto: "",
    calle: "",
    altura: "",
  });

  useEffect(() => {
    setdatePickedUpByUser(moment().format(`${fecha} ${hora}:${minuto}`));
  }, [fecha, hora, minuto]);

  const handleInviteUser = (email: string) => {
    setInvitations((state) => [...state, email]);
  };

  const handleOnInputs = (
    ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isValid = areInputsValid(ev);

    if (typeof isValid === "boolean") {
      dispatch(removeError());
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: t(isValid),
      });
      dispatch(setError(t(isValid)));
    }
  };

  const handleDeleteInvitation = (email: string) => {
    setInvitations((state) =>
      state.filter((invitation) => invitation !== email)
    );
  };

  const handleSearchAddress = () => {
    dispatch(startLoading());
    if (calle && altura) {
      getAddressLatLon(`${calle} ${altura}`)
        .then((datos: Direcciones[]) => setAdresses(removeDuplicates(datos)))
        .catch(console.log);

      dispatch(removeError());
    } else {
      dispatch(setError("Debe ingresar calle y altura"));
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Debe ingresar calle y altura",
      });
    }
    dispatch(finishLoading());
  };

  const handleOnClickToGetTemperature = async () => {
    dispatch(startLoading());
    setTemperatura(
      await getTemperature(
        addressPickedUpByUser?.calle as string,
        addressPickedUpByUser?.altura as string,
        addressPickedUpByUser?.localidad as string,
        datePickedUpByUser as string
      )
    );
    dispatch(finishLoading());
  };

  const handleOnSelectAddress = async (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (datePickedUpByUser && adresses) {
      try {
        dispatch(startLoading());
        const direccionElegida: Direcciones = adresses?.filter(
          (ad: Direcciones) => ad.nomenclatura === ev.currentTarget.value
        )[0];
        setaddressPickedUpByUser({
          calle: direccionElegida.calle.nombre as string,
          altura: direccionElegida.altura.valor.toString(),
          localidad: direccionElegida.localidad_censal.nombre as string,
        });

        dispatch(finishLoading());
      } catch (error) {
        console.warn(error);
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Favor de completar el formulario",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isValid = IsMeetupFormValid(
      datePickedUpByUser,
      calle,
      altura,
      `${addressPickedUpByUser}`,
      invitations
    );

    if (typeof isValid === "boolean") {
      dispatch(
        startNewMeetup({
          creadaPor: userName,
          fecha: datePickedUpByUser as string,
          direccion: `${addressPickedUpByUser?.calle}, ${addressPickedUpByUser?.altura}, ${addressPickedUpByUser?.localidad}`,
          invitados: invitations,
          confirmados: [],
          birras: BirrasNecesarias(temperatura as number, invitations)[0],
          cajones: BirrasNecesarias(temperatura as number, invitations)[1],
          temperatura: temperatura as number,
        })
      );
      dispatch(removeError());
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: t(isValid),
      });
      dispatch(setError(t(isValid)));
    }
  };

  if (userType === "user") {
    return (
      <div className="col vh-50 vw-50 mx-md-auto my-md-5 d-flex justify-content-center align-items-center">
        <h3 className="text-danger display-6">
          {t(`meetupsPage.errors.not-admin`)}
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className="col mx-md-auto my-md-5 d-flex justify-content-center align-items-center flex-md-wrap">
        <div className="card form-create-meetup">
          <div className="card-body d-flex justify-content-center align-items-center flex-column">
            <p className="card-title text-center">
              {t(`meetupsPage.create-meetup-form`)}
            </p>
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-center"
            >
              <PickDateAndTimeInputs
                fecha={fecha}
                handleOnInputs={handleOnInputs}
                onChangeForm={onChangeForm}
                hora={hora}
                minuto={minuto}
              />

              <PickStreetAndHouseNumber
                altura={altura}
                calle={calle}
                handleOnInputs={handleOnInputs}
                onChangeForm={onChangeForm}
              />

              <ValidateAndPickFinalAddress
                adresses={adresses as Direcciones[]}
                altura={altura}
                calle={calle}
                isLoading={isLoading}
                handleOnInputs={handleOnInputs}
                handleOnSelectAddress={handleOnSelectAddress}
                handleSearchAddress={handleSearchAddress}
              />

              <HandleInvitations
                invitations={invitations}
                showInviteUsers={showInviteUsers}
                setshowInviteUsers={setshowInviteUsers}
              />

              <button
                className="btn btn-warning align-self-center my-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleOnClickToGetTemperature();
                }}
              >
                {t(`meetupsPage.calculate-beers-and-weather`)}
              </button>
              <button className="btn btn-danger text-center  align-self-center my-3">
                {t(`meetupsPage.create-meetup`)}
              </button>
            </form>
          </div>

          <BirrasAndTempPreview
            isLoading={isLoading}
            invitations={invitations}
            temperatura={temperatura as number}
          />
        </div>
      </div>
      {showInviteUsers && (
        <MeetupsUsersList
          handleInviteUser={handleInviteUser}
          invitations={invitations}
          handleDeleteInvitation={handleDeleteInvitation}
          setshowInviteUsers={setshowInviteUsers}
          showInviteUsers={showInviteUsers}
        />
      )}
    </>
  );
};
