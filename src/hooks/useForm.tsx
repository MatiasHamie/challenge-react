import { useState } from "react";

/**
 *
 * @param initialForm
 * @returns Copia del formulario, el manejador onChange del mismo
 */
export const useForm = <T extends Object>(initialForm: T) => {
  const [state, setState] = useState(initialForm);

  const resetForm = () => {
    setState(initialForm);
  };

  const onChangeForm = (value: string, campo: keyof T) => {
    setState({
      ...state,
      [campo]: value,
    });
  };

  return { ...state, onChangeForm, resetForm, setState };
};
