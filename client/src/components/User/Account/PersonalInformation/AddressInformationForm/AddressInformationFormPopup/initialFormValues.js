import {
  PHONE_PATTERN,
  ZIP_CODE_PATTERN,
  NAME_PATTERN,
} from "../../../../../../constants/forms";

const FORM_KEYS = {
  FirstName: "firstName",
  LastName: "lastName",
  PhoneNumber: "phoneNumber",
  Country: "country",
  City: "city",
  Street: "street",
  ZipCode: "zipCode",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.FirstName]: {
    fieldLabel: "First Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
  },

  [FORM_KEYS.LastName]: {
    fieldLabel: "Last Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
  },

  [FORM_KEYS.PhoneNumber]: {
    fieldLabel: "Phone Number",
    fieldValue: "",
    regexPattern: PHONE_PATTERN,
    errorMessage: "",
    isFocused: false,
  },

  [FORM_KEYS.Country]: {
    fieldLabel: "Country",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
  },

  [FORM_KEYS.City]: {
    fieldLabel: "City",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
  },

  [FORM_KEYS.Street]: {
    fieldLabel: "Street",
    fieldValue: "",
    regexPattern: STREET_PATTERN,
    errorMessage: "",
    isFocused: false,
  },

  [FORM_KEYS.ZipCode]: {
    fieldLabel: "Zip Code",
    fieldValue: "",
    regexPattern: ZIP_CODE_PATTERN,
    errorMessage: "",
    isFocused: false,
  },
};

export { FORM_KEYS };
