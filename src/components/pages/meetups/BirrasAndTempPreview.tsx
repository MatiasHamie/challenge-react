import { BirrasNecesarias } from "../../../helpers/BirrasNecesarias";
import { useTranslation } from "react-i18next";

interface Props {
  isLoading: boolean;
  temperatura: number;
  invitations: string[];
}

export const BirrasAndTempPreview: React.FC<Props> = ({
  isLoading,
  temperatura,
  invitations,
}) => {
  const { t } = useTranslation("global");
  return (
    <>
      {isLoading ? (
        <div
          className="spinner-border text-danger align-self-center text-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="text-center text-danger">
          {temperatura && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>
                <b>{t(`meetupsPage.preview-weather-beers`)} </b>
              </p>
              <p>{`${t(
                `meetupsPage.meetup-weather`
              )} ${temperatura} Grados`}</p>
              <p>{`${t(`meetupsPage.beers-needed`)} ${
                BirrasNecesarias(temperatura, invitations)[0]
              } ${t(`meetupsPage.beers`)} o ${
                BirrasNecesarias(temperatura, invitations)[1]
              } ${t(`meetupsPage.boxes`)}`}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
