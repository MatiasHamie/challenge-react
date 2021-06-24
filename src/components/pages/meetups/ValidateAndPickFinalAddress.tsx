import React from "react";
import { Direcciones } from "../../../interfaces/Addresses";
import { ChooseAddressFromList } from "../../ui/ChooseAddressFromList";
import { useTranslation } from "react-i18next";

interface Props {
  calle: string;
  altura: string;
  adresses: Direcciones[];
  isLoading: boolean;
  handleOnInputs: (
    ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSearchAddress: () => void;
  handleOnSelectAddress: (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => Promise<void>;
}

export const ValidateAndPickFinalAddress: React.FC<Props> = ({
  handleOnInputs,
  handleSearchAddress,
  handleOnSelectAddress,
  calle,
  altura,
  adresses,
  isLoading,
}) => {
  const { t } = useTranslation("global");
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        {calle && altura && (
          <button
            className="btn btn-warning w-75 my-2 animate__animated animate__bounceIn"
            onClick={(e) => {
              e.preventDefault();
              handleSearchAddress();
            }}
          >
            {t(`meetupsPage.errors.address-not-found`)}
          </button>
        )}
        {calle && altura && !adresses && isLoading && (
          <div
            className="spinner-border text-danger align-self-center text-center"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {calle && altura && !adresses && !isLoading && (
          <p className="text-center">
            {t(`meetupsPage.confirm-validate-neighborhood`)}
          </p>
        )}
        {adresses && (
          <ChooseAddressFromList
            adresses={adresses as Direcciones[]}
            handleOnInputs={handleOnInputs}
            handleOnSelectAddress={handleOnSelectAddress}
          />
        )}
      </div>
    </>
  );
};
