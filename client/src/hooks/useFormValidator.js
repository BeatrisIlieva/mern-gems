import { ERROR_MESSAGES } from "../constants/forms";

const isValid = (value, pattern) => {
  return pattern.test(value);
};

export const getErrorMessage = (field, value, pattern) => {
  const error = ERROR_MESSAGES[field];
  console.log(field);
  console.log(value);
  console.log(pattern)
  console.log(error);
  if (!isValid(value, pattern)) {
    return ERROR_MESSAGES[field];
  } else {
    return "";
  }
};

export const getEmailMismatchErrorMessage = (email, retypeEmail) => {
  if (email !== retypeEmail) {
    return ERROR_MESSAGES.emailMismatch;
  } else {
    return "";
  }
};

export const getPasswordMismatchErrorMessage = (password, retypePassword) => {
  if (password !== retypePassword) {
    return ERROR_MESSAGES.passwordMismatch;
  } else {
    return "";
  }
};
