import React from "react";
import { useTranslation } from 'react-i18next';

interface Props {
  handleOnInputs: (
    ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChangeForm: (
    value: string,
    campo: "fecha" | "calle" | "altura" | "hora" | "minuto"
  ) => void;
  calle: string;
  altura: string;
}

export const PickStreetAndHouseNumber: React.FC<Props> = ({
  handleOnInputs,
  onChangeForm,
  calle,
  altura,
}) => {
  const { t } = useTranslation("global");
  return (
    <>
      <div className="d-flex flex-row align-items-center-justify-content-center">
        <input
          id="calle"
          onBlur={handleOnInputs}
          type="text"
          className="form-control"
          placeholder={t(`meetupsPage.address-street`)}
          value={calle}
          onChange={({ target }) => onChangeForm(target.value, "calle")}
        />
        <input
          id="altura"
          onBlur={handleOnInputs}
          type="text"
          className="form-control"
          placeholder={t(`meetupsPage.address-number`)}
          value={altura}
          onChange={({ target }) => onChangeForm(target.value, "altura")}
        />
      </div>
    </>
  );
};
