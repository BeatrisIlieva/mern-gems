import {
  LONG_CARD_NUMBER_PATTERN,
  CARD_HOLDER_NAME_PATTERN,
} from "../../../../../constants/forms";

const FORM_KEYS = {
  LongCardNumber: "longCardNumber",
  CardHolder: "cardHolder",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.LongCardNumber]: {
    fieldLabel: "Card Number",
    fieldValue: "",
    regexPattern: LONG_CARD_NUMBER_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "0123456789123456",
    invalidTestData: "012345678912345T",
    emptyTestData: "",
  },

  [FORM_KEYS.CardHolder]: {
    fieldLabel: "Name on card",
    fieldValue: "",
    regexPattern: CARD_HOLDER_NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "Test",
    invalidTestData: "Test1",
    emptyTestData: "",
  },
};

export { FORM_KEYS };
