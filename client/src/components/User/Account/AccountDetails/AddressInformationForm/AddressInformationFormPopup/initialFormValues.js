import {
  PHONE_PATTERN,
  ZIP_CODE_PATTERN,
  NAME_PATTERN,
  STREET_PATTERN,
} from "../../../../../../constants/forms";

const FORM_KEYS = {
  PhoneNumber: "phoneNumber",
  Country: "country",
  City: "city",
  Street: "street",
  ZipCode: "zipCode",
  Apartment: "apartment",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.PhoneNumber]: {
    fieldLabel: "Phone Number",
    fieldValue: "",
    regexPattern: PHONE_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.Country]: {
    fieldLabel: "Country",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.City]: {
    fieldLabel: "City",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.Street]: {
    fieldLabel: "Street",
    fieldValue: "",
    regexPattern: STREET_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.Apartment]: {
    fieldLabel: "Apartment/Suite",
    fieldValue: "",
    regexPattern: STREET_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.ZipCode]: {
    fieldLabel: "Zip Code",
    fieldValue: "",
    regexPattern: ZIP_CODE_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },
};

export { FORM_KEYS };
