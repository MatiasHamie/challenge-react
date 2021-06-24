import { Types } from "../types/types";

export const setError = (err: string) => {
  return { type: Types.uiSetError, payload: err };
};

export const removeError = () => {
  return { type: Types.uiRemoveError };
};

export const startLoading = () => {
  return { type: Types.uiStartLoading };
};

export const finishLoading = () => {
  return { type: Types.uiFinishLoading };
};
