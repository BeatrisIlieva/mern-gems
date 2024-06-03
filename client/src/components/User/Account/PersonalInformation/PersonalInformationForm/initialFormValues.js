import { DATE_PATTERN, NAME_PATTERN} from "../../../../../constants/forms";


const FORM_KEYS = {
  FirstName: "firstName",
  LastName: "lastName",
  Birthday: "birthday",
  SpecialDay: "specialDay"
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.FirstName]: {
    fieldLabel: "First Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.LastName]: {
    fieldLabel: "Last Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.Birthday]: {
    fieldLabel: "Birthday (DD/MM/YYYY)",
    fieldValue: "",
    regexPattern: DATE_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },

  [FORM_KEYS.SpecialDay]: {
    fieldLabel: "Anniversary/Wedding (DD/MM/YYYY)",
    fieldValue: "",
    regexPattern: DATE_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
  },
};

export { FORM_KEYS };
