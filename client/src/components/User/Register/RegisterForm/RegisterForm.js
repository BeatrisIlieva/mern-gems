import { useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import {
  getErrorMessage,
  getEmailMismatchErrorMessage,
  getPasswordMismatchErrorMessage,
} from "../../../../hooks/useFormValidator";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import formStyles from "../../../../commonCSS/forms.module.css";
import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const { onRegisterSubmit } = useContext(AuthContext);
  const [values, setValues] = useState(INITIAL_FORM_VALUES);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const changeHandler = (fieldKey, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], fieldValue: newValue },
    }));
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

    if (values[FORM_KEYS.Email].errorMessage === "") {
      const emailErrorMessage = getEmailMismatchErrorMessage(
        values[FORM_KEYS.Email].fieldValue,
        values[FORM_KEYS.RetypeEmail].fieldValue
      );

      values[FORM_KEYS.Email].errorMessage = emailErrorMessage;
      values[FORM_KEYS.RetypeEmail].errorMessage = emailErrorMessage;

      if (emailErrorMessage !== "") {
        setErrorOccurred(true);
      }
    }

    if (values[FORM_KEYS.Password].errorMessage === "") {
      const passwordErrorMessage = getPasswordMismatchErrorMessage(
        values[FORM_KEYS.Password].fieldValue,
        values[FORM_KEYS.RetypePassword].fieldValue
      );

      values[FORM_KEYS.Password].errorMessage = passwordErrorMessage;
      values[FORM_KEYS.RetypePassword].errorMessage = passwordErrorMessage;

      if (passwordErrorMessage !== "") {
        setErrorOccurred(true);
      }
    }

    if (errorOccurred) {
      setErrorOccurred(false);
      return;
    } else {
      const email = values.email.fieldValue;
      console.log(email);
      const password = values.password.fieldValue;
      const firstName = values.firstName.fieldValue;
      const lastName = values.lastName.fieldValue;

      const data = { email, password, firstName, lastName };
      try {
        await onRegisterSubmit(data);
      } catch (err) {
        values[FORM_KEYS.Email].errorMessage = err.message;
      }
    }
  };

  return (
    <>
    <h1>New Customers</h1>
    <form
      method="POST"
      onSubmit={submitHandler}
      className={styles["form-container"]}
    >
      <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
        <div
          className={`${formStyles["field-container"]} ${
            INITIAL_FORM_VALUES[FORM_KEYS.FirstName].errorMessage !== ""
              ? formStyles["error"]
              : ""
          }`.trim()}
        >
          <input
            type="text"
            name={FORM_KEYS.FirstName}
            id={FORM_KEYS.FirstName}
            value={values[FORM_KEYS.FirstName].fieldValue}
            onChange={(e) => changeHandler(FORM_KEYS.FirstName, e.target.value)}
          />
          <label htmlFor="firstName">
            {INITIAL_FORM_VALUES[FORM_KEYS.FirstName].fieldLabel}
          </label>
          <div className={formStyles["error-message"]}>
            {values[FORM_KEYS.FirstName].errorMessage}
          </div>
        </div>
      </div>
      <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
        <div
          className={`${formStyles["field-container"]} ${
            INITIAL_FORM_VALUES[FORM_KEYS.LastName].errorMessage !== ""
              ? formStyles["error"]
              : ""
          }`.trim()}
        >
          <input
            type="text"
            name={FORM_KEYS.LastName}
            id={FORM_KEYS.LastName}
            value={values[FORM_KEYS.LastName].fieldValue}
            onChange={(e) => changeHandler(FORM_KEYS.LastName, e.target.value)}
          />
          <label htmlFor="lastName">
            {INITIAL_FORM_VALUES[FORM_KEYS.LastName].fieldLabel}
          </label>
          <div className={formStyles["error-message"]}>
            {values[FORM_KEYS.LastName].errorMessage}
          </div>
        </div>
      </div>
      <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
        <div
          className={`${formStyles["field-container"]} ${
            INITIAL_FORM_VALUES[FORM_KEYS.Email].errorMessage !== ""
              ? formStyles["error"]
              : ""
          }`.trim()}
        >
          <input
            type="email"
            name={FORM_KEYS.Email}
            id={FORM_KEYS.Email}
            value={values[FORM_KEYS.Email].fieldValue}
            onChange={(e) => changeHandler(FORM_KEYS.Email, e.target.value)}
          />
          <label htmlFor="email">
            {INITIAL_FORM_VALUES[FORM_KEYS.Email].fieldLabel}
          </label>
          <div className={formStyles["error-message"]}>
            {values[FORM_KEYS.Email].errorMessage}
          </div>
        </div>
      </div>
      <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
        <div
          className={`${formStyles["field-container"]} ${
            INITIAL_FORM_VALUES[FORM_KEYS.RetypeEmail].errorMessage !== ""
              ? formStyles["error"]
              : ""
          }`.trim()}
        >
          <input
            type="email"
            name={FORM_KEYS.RetypeEmail}
            id={FORM_KEYS.RetypeEmail}
            value={values[FORM_KEYS.RetypeEmail].fieldValue}
            onChange={(e) =>
              changeHandler(FORM_KEYS.RetypeEmail, e.target.value)
            }
          />
          <label htmlFor="email">
            {INITIAL_FORM_VALUES[FORM_KEYS.RetypeEmail].fieldLabel}
          </label>
          <div className={formStyles["error-message"]}>
            {values[FORM_KEYS.RetypeEmail].errorMessage}
          </div>
        </div>
      </div>
      <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
        <div
          className={`${formStyles["field-container"]} ${
            INITIAL_FORM_VALUES[FORM_KEYS.Password].errorMessage !== ""
              ? formStyles["error"]
              : ""
          }`.trim()}
        >
          <input
            type="password"
            name={FORM_KEYS.Password}
            id={FORM_KEYS.Password}
            value={values[FORM_KEYS.Password].fieldValue}
            onChange={(e) => changeHandler(FORM_KEYS.Password, e.target.value)}
          />
          <label htmlFor="password">
            {INITIAL_FORM_VALUES[FORM_KEYS.Password].fieldLabel}
          </label>
          <div className={formStyles["error-message"]}>
            {values[FORM_KEYS.Password].errorMessage}
          </div>
        </div>
      </div>
      <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
        <div
          className={`${formStyles["field-container"]} ${
            INITIAL_FORM_VALUES[FORM_KEYS.RetypePassword].errorMessage !== ""
              ? formStyles["error"]
              : ""
          }`.trim()}
        >
          <input
            type="password"
            name={FORM_KEYS.RetypePassword}
            id={FORM_KEYS.RetypePassword}
            value={values[FORM_KEYS.RetypePassword].fieldValue}
            onChange={(e) =>
              changeHandler(FORM_KEYS.RetypePassword, e.target.value)
            }
          />
          <label htmlFor="retypePassword">
            {INITIAL_FORM_VALUES[FORM_KEYS.RetypePassword].fieldLabel}
          </label>
          <div className={formStyles["error-message"]}>
            {values[FORM_KEYS.RetypePassword].errorMessage}
          </div>
        </div>
      </div>
      <input
        className={`${formStyles["button"]} ${formStyles["pink"]} ${formStyles["hover"]} ${styles["button"]}`}
        type="submit"
        value="Save"
      />
    </form>
    </>
  );
};
