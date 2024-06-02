import { useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import { getErrorMessage } from "../../../../hooks/useFormValidator";
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from "../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import formStyles from "../../../../commonCSS/forms.module.css";
import styles from "./LoginForm.module.css";
import { useForm } from "../../../../hooks/useForm";
import { DynamicFormNotAuthUser } from "../../../DynamicForm/DynamicFormNotAuthUser";

export const LoginForm = () => {
  const { onLoginSubmit } = useContext(AuthContext);
  // const [values, setValues] = useState(INITIAL_FORM_VALUES);

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


    const updatedValues = { ...values };



    if (errorOccurred) {
      setErrorOccurred(false);
      setValues(updatedValues);

      return;
    } else {
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;

      const data = { email, password };
      try {
        await onLoginSubmit(data);
      } catch (err) {
        if (err.message === INVALID_CREDENTIALS_ERROR_MESSAGE) {
          values[FORM_KEYS.Email].errorMessage = err.message;
          const updatedValues = { ...values };
          setValues(updatedValues);
          updateForm();
        }
      }
    }
  };

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
          // userPasswordInformation={userPasswordInformation}
        />
      </form>
      {/* <form
        method="POST"
        onSubmit={submitHandler}
        className={styles["form-container"]}
      >
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.Email].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.Email)}
            onBlur={() => blurHandler(FORM_KEYS.Email)}
          >
            <input
              type="email"
              name={FORM_KEYS.Email}
              id={FORM_KEYS.Email}
              value={values[FORM_KEYS.Email].fieldValue}
              onChange={(e) => changeHandler(FORM_KEYS.Email, e.target.value)}
              onFocus={() => clickHandler(FORM_KEYS.Email)}
              data-testid={`${FORM_KEYS.Email}-input`}
            />
            <label
              htmlFor={FORM_KEYS.Email}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.Email].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.Email].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.Email}-error`}
          >
            {values[FORM_KEYS.Email].errorMessage}
          </div>
        </div>
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.Password].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.Password)}
            onBlur={() => blurHandler(FORM_KEYS.Password)}
          >
            <input
              type="password"
              name={FORM_KEYS.Password}
              id={FORM_KEYS.Password}
              value={values[FORM_KEYS.Password].fieldValue}
              onChange={(e) =>
                changeHandler(FORM_KEYS.Password, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.Password)}
              data-testid={`${FORM_KEYS.Password}-input`}
            />
            <label
              htmlFor={FORM_KEYS.Password}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.Password].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.Password].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.Password}-error`}
          >
            {values[FORM_KEYS.Password].errorMessage}
          </div>
        </div>
        <button
          className={`${formStyles["animated-button"]} ${styles["button"]}`}
          type="submit"
          data-testid="submit"
        >
          Sign In
        </button>
      </form> */}
    </section>
  );
};
