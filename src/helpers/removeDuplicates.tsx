import { Direcciones } from '../interfaces/Addresses';
export const removeDuplicates = (data: Direcciones[]): Direcciones[] => {
  return data.filter(
    (v, i, a) => a.findIndex((t) => t.nomenclatura === v.nomenclatura) === i
  );
};
