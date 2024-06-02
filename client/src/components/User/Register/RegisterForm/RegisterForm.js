import {useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import {
  getEmailMismatchErrorMessage,
  getPasswordMismatchErrorMessage,
} from "../../../../hooks/useFormValidator";
import { EMAIL_ALREADY_EXISTS_ERROR_MESSAGE } from "../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import styles from "./RegisterForm.module.css";
import {useForm} from "../../../../hooks/useForm";
import {DynamicFormNotAuthUser} from "../../../DynamicForm/DynamicFormNotAuthUser"

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

  const buttonValue = "Create an account"

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
      {/* <form
        method="POST"
        onSubmit={onSubmit}
        className={styles["form-container"]}
      >
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.FirstName].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.FirstName)}
            onBlur={() => blurHandler(FORM_KEYS.FirstName)}
          >
            <input
              type="text"
              name={FORM_KEYS.FirstName}
              id={FORM_KEYS.FirstName}
              value={values[FORM_KEYS.FirstName].fieldValue}
              onChange={(e) =>
                changeHandler(FORM_KEYS.FirstName, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.FirstName)}
              data-testid={`${FORM_KEYS.FirstName}-input`}
            />
            <label
              htmlFor={FORM_KEYS.FirstName}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.FirstName].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.FirstName].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.FirstName}-error`}
          >
            {values[FORM_KEYS.FirstName].errorMessage}
          </div>
        </div>
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.LastName].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.LastName)}
            onBlur={() => blurHandler(FORM_KEYS.LastName)}
          >
            <input
              type="text"
              name={FORM_KEYS.LastName}
              id={FORM_KEYS.LastName}
              value={values[FORM_KEYS.LastName].fieldValue}
              onChange={(e) =>
                changeHandler(FORM_KEYS.LastName, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.LastName)}
              data-testid={`${FORM_KEYS.LastName}-input`}
            />
            <label
              htmlFor={FORM_KEYS.LastName}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.LastName].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.LastName].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.LastName}-error`}
          >
            {values[FORM_KEYS.LastName].errorMessage}
          </div>
        </div>
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <span>
            <>{hoveredQuestionMarkEmail && <QuestionMarkEmail />}</>
            <FontAwesomeIcon
              icon={faQuestion}
              className={styles["input-icon"]}
              onMouseEnter={() => onHoverQuestionMarkEmail()}
              onMouseLeave={() => onUnhoverQuestionMarkEmail()}
            />
          </span>
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
              values[FORM_KEYS.RetypeEmail].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.RetypeEmail)}
            onBlur={() => blurHandler(FORM_KEYS.RetypeEmail)}
          >
            <input
              type="email"
              name={FORM_KEYS.RetypeEmail}
              id={FORM_KEYS.RetypeEmail}
              value={values[FORM_KEYS.RetypeEmail].fieldValue}
              onChange={(e) =>
                changeHandler(FORM_KEYS.RetypeEmail, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.RetypeEmail)}
              data-testid={`${FORM_KEYS.RetypeEmail}-input`}
            />
            <label
              htmlFor={FORM_KEYS.RetypeEmail}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.RetypeEmail].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.RetypeEmail].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.RetypeEmail}-error`}
          >
            {values[FORM_KEYS.RetypeEmail].errorMessage}
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
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.RetypePassword].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.RetypePassword)}
            onBlur={() => blurHandler(FORM_KEYS.RetypePassword)}
          >
            <input
              type="password"
              name={FORM_KEYS.RetypePassword}
              id={FORM_KEYS.RetypePassword}
              value={values[FORM_KEYS.RetypePassword].fieldValue}
              onChange={(e) =>
                changeHandler(FORM_KEYS.RetypePassword, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.RetypePassword)}
              data-testid={`${FORM_KEYS.RetypePassword}-input`}
            />
            <label
              htmlFor={FORM_KEYS.RetypePassword}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.RetypePassword].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.RetypePassword].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.RetypePassword}-error`}
          >
            {values[FORM_KEYS.RetypePassword].errorMessage}
          </div>
        </div>
        <button
          className={`${formStyles["animated-button"]} ${styles["button"]}`}
          type="submit"
          data-testid="submit"
        >
          Create an Account
        </button>
      </form> */}
    </section>
  );
};
