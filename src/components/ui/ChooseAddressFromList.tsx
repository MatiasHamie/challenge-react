import React from "react";
import { Direcciones } from "../../interfaces/Addresses";

interface Props {
  handleOnSelectAddress: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOnInputs: (
    ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  adresses: Direcciones[];
}

export const ChooseAddressFromList: React.FC<Props> = ({
  handleOnSelectAddress,
  handleOnInputs,
  adresses,
}) => {
  return (
    <select
    id="direccionElegida"
      className="w-100 mx-auto mt-2 animate__animated animate__bounceIn rounded"
      onChange={handleOnSelectAddress}
    >
      <option value="">-- Elegir Direccion --</option>
      {adresses?.map((a) => (
        <option key={a.nomenclatura} value={a.nomenclatura}>
          {a.nomenclatura}
        </option>
      ))}
    </select>
  );
};
