import { EMAIL_PATTERN, PASSWORD_PATTERN, NAME_PATTERN} from "../../../../constants/forms";


const FORM_KEYS = {
  Email: "email",
  Password: "password",
  RetypeEmail: "retypeEmail",
  RetypePassword: "retypePassword",
  FirstName: "firstName",
  LastName: "lastName",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.Email]: {
    fieldLabel: "Email Address",
    fieldValue: "",
    regexPattern: EMAIL_PATTERN,
    errorMessage: "",
    onFocus: false,
  },

  [FORM_KEYS.RetypeEmail]: {
    fieldLabel: "Retype Email Address",
    fieldValue: "",
    regexPattern: EMAIL_PATTERN,
    errorMessage: "",
    onFocus: false,
  },

  [FORM_KEYS.Password]: {
    fieldLabel: "Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    onFocus: false,
  },

  [FORM_KEYS.RetypePassword]: {
    fieldLabel: "Retype Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    onFocus: false,
  },

  [FORM_KEYS.FirstName]: {
    fieldLabel: "First Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    onFocus: false,
  },

  [FORM_KEYS.LastName]: {
    fieldLabel: "Last Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    onFocus: false,
  },
};

export { FORM_KEYS };
