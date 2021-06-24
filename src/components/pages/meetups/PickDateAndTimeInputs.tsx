
import { useTranslation } from "react-i18next";

interface Props {
  handleOnInputs: (
    ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChangeForm: (
    value: string,
    campo: "fecha" | "calle" | "altura" | "hora" | "minuto"
  ) => void;
  fecha: string;
  hora: string;
  minuto: string;
}

export const PickDateAndTimeInputs: React.FC<Props> = ({
  handleOnInputs,
  onChangeForm,
  fecha,
  hora,
  minuto,
}) => {
  const { t } = useTranslation("global");
  return (
    <>
      <div className="d-flex flex-row align-items-center-justify-content-center">
        <input
          id="fecha"
          type="date"
          onInput={handleOnInputs}
          onBlur={handleOnInputs}
          className="form-control fecha"
          placeholder={t(`meetupsPage.dateTime-date`)}
          value={fecha}
          onChange={({ target }) => onChangeForm(target.value, "fecha")}
        />
        <input
          id="horas"
          type="number"
          onBlur={handleOnInputs}
          className="form-control horas"
          placeholder={t(`meetupsPage.dateTime-hours`)}
          value={hora}
          onChange={({ target }) => onChangeForm(target.value, "hora")}
        />
        <input
          id="minutos"
          type="number"
          onBlur={handleOnInputs}
          className="form-control minutos"
          placeholder={t(`meetupsPage.dateTime-minutes`)}
          value={minuto}
          onChange={({ target }) => onChangeForm(target.value, "minuto")}
        />
      </div>
    </>
  );
};
