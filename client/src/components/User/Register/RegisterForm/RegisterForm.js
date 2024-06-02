import { useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import {
  getEmailMismatchErrorMessage,
  getPasswordMismatchErrorMessage,
} from "../../../../hooks/useFormValidator";
import { EMAIL_ALREADY_EXISTS_ERROR_MESSAGE } from "../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import styles from "./RegisterForm.module.css";
import { useForm } from "../../../../hooks/useForm";
import { DynamicFormNotAuthUser } from "../../../DynamicForm/DynamicFormNotAuthUser";

export const RegisterForm = () => {
  const { onRegisterSubmit } = useContext(AuthContext);

  const {
    values,
    setValues,
    errorOccurred,
    setErrorOccurred,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    updateForm();
  }, []);

  const onSubmit = async (e) => {
    submitHandler(e);
    setErrorOccurred(false);

    const updatedValues = { ...values };

    if (
      updatedValues[FORM_KEYS.Email].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypeEmail].errorMessage === ""
    ) {
      const emailErrorMessage = getEmailMismatchErrorMessage(
        updatedValues[FORM_KEYS.Email].fieldValue,
        updatedValues[FORM_KEYS.RetypeEmail].fieldValue
      );

      updatedValues[FORM_KEYS.Email].errorMessage = emailErrorMessage;
      updatedValues[FORM_KEYS.RetypeEmail].errorMessage = emailErrorMessage;

      if (emailErrorMessage !== "") {
        setErrorOccurred(true);
      }
    }

    if (
      updatedValues[FORM_KEYS.Password].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypePassword].errorMessage === ""
    ) {
      const passwordErrorMessage = getPasswordMismatchErrorMessage(
        values[FORM_KEYS.Password].fieldValue,
        values[FORM_KEYS.RetypePassword].fieldValue
      );

      updatedValues[FORM_KEYS.Password].errorMessage = passwordErrorMessage;
      updatedValues[FORM_KEYS.RetypePassword].errorMessage =
        passwordErrorMessage;

      if (passwordErrorMessage !== "") {
        setErrorOccurred(true);
      }
    }

    if (errorOccurred) {
      setErrorOccurred(false);
      setValues(updatedValues);

      return;
    } else {
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;
      const firstName = values.firstName.fieldValue;
      const lastName = values.lastName.fieldValue;

      const data = { email, password, firstName, lastName };
      try {
        await onRegisterSubmit(data);
      } catch (err) {
        if (err.message === EMAIL_ALREADY_EXISTS_ERROR_MESSAGE) {
          values[FORM_KEYS.Email].errorMessage = err.message;
          const updatedValues = { ...values };
          setValues(updatedValues);
          updateForm();
        }
      }
    }
  };

  const buttonValue = "Create an account";

  return (
    <section className={styles["register-container"]}>
      <form
        method="POST"
        onSubmit={onSubmit}
        className={styles["form-container"]}
      >
        <DynamicFormNotAuthUser
          values={values}
          FORM_KEYS={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          INITIAL_FORM_VALUES={INITIAL_FORM_VALUES}
          buttonValue={buttonValue}
        />
      </form>
    </section>
  );
};
