import { useState } from "react";
import { getErrorMessage} from "./useFormValidator";

export const useForm = (INITIAL_FORM_VALUES) => {
  const [values, setValues] = useState(INITIAL_FORM_VALUES);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const updateForm = () => {
    Object.keys(values).forEach((fieldKey) => {
      const input = document.getElementById(fieldKey);

      if (input && input.value !== "") {
        setValues((prevValues) => ({
          ...prevValues,
          [fieldKey]: {
            ...prevValues[fieldKey],
            fieldValue: input.value,
            isFocused: true,
          },
        }));
      }
    });
  };

  const clickHandler = (fieldKey) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], isFocused: true },
    }));
  };

  const blurHandler = (fieldKey) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: {
        ...prevValues[fieldKey],
        isFocused: prevValues[fieldKey].fieldValue !== "",
      },
    }));
  };

  const changeHandler = (fieldKey, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], fieldValue: newValue },
    }));
    updateForm();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    Object.keys(values).forEach((key) => {
      const field = values[key];

      field.errorMessage = getErrorMessage(
        key,
        field.fieldValue,
        field.regexPattern
      );


      if (field.errorMessage !== "") {
        setErrorOccurred(true);
      }
    });
  };

  return {
    values,
    setValues,
    errorOccurred,
    setErrorOccurred,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  };
};
