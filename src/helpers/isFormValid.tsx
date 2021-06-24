import validator from "validator";
import moment from "moment";

export const IsFormValid = (
  email: string,
  password: string,
  name?: string,
  password2?: string
): boolean | string => {
  let isValid = true;
  let message = "";
  

  if (email.trim().length < 2 || !validator.isEmail(email)) {
    message = "authPage.errors.valid-email";
    isValid = false;
  } else if (password.length < 6) {
    message = "authPage.errors.min-length-password";
    isValid = false;
  } else if (password2 && password !== password2) {
    message = "authPage.errors.same-password";
    isValid = false;
  } else if (name && name.trim().length < 2) {
    message = "authPage.errors.min-length-name";
    isValid = false;
  }

  if (!isValid) {
    return message;
  }

  return true;
};

export const IsMeetupFormValid = (
  date?: string,
  street?: string,
  houseNumber?: string,
  addressSelectedFromDropMenu?: string,
  invitations?: string[]
): boolean | string => {
  let isValid = true;
  let message = "";
  console.log(
    moment(date, "DD-MM-YYYY HH:mm").hour().valueOf(),
    moment(date, "DD-MM-YYYY HH:mm").minute().valueOf()
  );

  if (!moment(date).isValid() || moment(date).diff(moment(), "days") > 5) {
    message = "homePage.errors.invalid-pickedUp-date";
    isValid = false;
  } else if (!street || street.trim().length < 2) {
    message = "homePage.errors.min-length-street";
    isValid = false;
  } else if (!houseNumber || houseNumber.trim().length < 1) {
    message = "homePage.errors.min-length-houseNumber";
    isValid = false;
  } else if (!invitations || invitations.length < 1) {
    message = "homePage.errors.min-invitations";
    isValid = false;
  } else if (
    !addressSelectedFromDropMenu ||
    addressSelectedFromDropMenu.trim().length < 1
  ) {
    message = "homePage.errors.select-address";
    isValid = false;
  }

  if (!isValid) {
    return message;
  }

  return true;
};

export const areInputsValid = (
  inputElement: React.FormEvent<HTMLInputElement | HTMLSelectElement>
): boolean | string => {
  let isValid = true;
  let message = "";
  let idInput = inputElement.currentTarget.id;
  let valorInput = inputElement.currentTarget.value;

  if (idInput === "fecha" && moment(valorInput).diff(moment(), "days") > 4) {
    isValid = false;
    message = `homePage.errors.invalid-pickedUp-date`;
  } else if (
    idInput === "horas" &&
    (parseInt(valorInput) > 23 || valorInput.length < 2)
  ) {
    isValid = false;
    message = "homePage.errors.wrong-hours";
  } else if (
    idInput === "minutos" &&
    (parseInt(valorInput) > 59 || valorInput.length < 2)
  ) {
    isValid = false;
    message = "homePage.errors.wrong-minutes";
  } else if (idInput === "calle" && valorInput.trim().length < 2) {
    message = "homePage.errors.min-length-street";
    isValid = false;
  } else if (idInput === "altura" && valorInput.trim().length < 2) {
    message = "homePage.errors.min-length-houseNumber";
    isValid = false;
  } else if (idInput === "direccionElegida" && valorInput.trim().length < 1) {
    message = "homePage.errors.select-address";
    isValid = false;
  }

  if (!isValid) {
    inputElement.currentTarget.classList.add("is-invalid");
    return message;
  }

  inputElement.currentTarget.classList.remove("is-invalid");
  return true;
};
