import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from "../../../../../constants/forms";

const FORM_KEYS = {
  Email: "email",
  Password: "password",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.Email]: {
    fieldLabel: "Email Address",
    fieldValue: "",
    regexPattern: EMAIL_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "email",
  },

  [FORM_KEYS.Password]: {
    fieldLabel: "Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "password",
  },
};

export { FORM_KEYS };
