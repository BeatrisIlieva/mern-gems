import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";
import {
  getErrorMessage,
  getPasswordMismatchErrorMessage,
} from "../../../../../hooks/useFormValidator";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import formStyles from "../../../../../commonCSS/forms.module.css";
import styles from "./PasswordInformationForm.module.css";

export const PasswordInformationForm = () => {
  const { userId } = useAuthContext();
  const loginInformationService = useService(loginInformationServiceFactory);
  const [userPasswordInformation, setUserPasswordInformation] = useState([]);
  const [values, setValues] = useState(INITIAL_FORM_VALUES);

  const updateForm = () => {
    Object.keys(values).forEach((fieldKey) => {
      const input = document.getElementById(fieldKey);

      if (input.value !== "") {
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

  useEffect(() => {
    loginInformationService
      .find(userId)
      .then((data) => {
        setUserPasswordInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userPasswordInformation]);

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

    const updatedValues = { ...values };

    let hasErrorOccurred = false;

    Object.keys(values).forEach((key) => {
      const field = values[key];

      field.errorMessage = getErrorMessage(
        key,
        field.fieldValue,
        field.regexPattern
      );

      if (field.errorMessage !== "") {
        hasErrorOccurred = true;
      }
    });

    if (
      updatedValues[FORM_KEYS.NewPassword].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypeNewPassword].errorMessage === ""
    ) {
      const passwordErrorMessage = getPasswordMismatchErrorMessage(
        values[FORM_KEYS.NewPassword].fieldValue,
        values[FORM_KEYS.RetypeNewPassword].fieldValue
      );

      updatedValues[FORM_KEYS.NewPassword].errorMessage = passwordErrorMessage;
      updatedValues[FORM_KEYS.RetypeNewPassword].errorMessage =
        passwordErrorMessage;

      if (passwordErrorMessage !== "") {
        hasErrorOccurred = true;
      }
    }

    if (hasErrorOccurred) {
      setValues(updatedValues);

      return;
    } else {
      const password = values.password.fieldValue;
      const newPassword = values.newPassword.fieldValue;

      const data = { password, newPassword };
      try {
        await loginInformationService.updatePassword(userId, data);
      } catch (err) {
        console.log(err.message);
        values[FORM_KEYS.Password].errorMessage = err.message;
        const updatedValues = { ...values };
        setValues(updatedValues);
        updateForm();
      }
    }
  };

  return (
    <section className={styles["login-container"]}>
      <form
        method="POST"
        onSubmit={submitHandler}
        className={styles["form-container"]}
      >
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
              defaultValue={userPasswordInformation[FORM_KEYS.Password]}
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
              values[FORM_KEYS.NewPassword].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.NewPassword)}
            onBlur={() => blurHandler(FORM_KEYS.NewPassword)}
          >
            <input
              type="password"
              name={FORM_KEYS.NewPassword}
              id={FORM_KEYS.NewPassword}
              defaultValue={userPasswordInformation[FORM_KEYS.NewPassword]}
              onChange={(e) =>
                changeHandler(FORM_KEYS.NewPassword, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.NewPassword)}
              data-testid={`${FORM_KEYS.NewPassword}-input`}
              className={styles["password"]}
            />
            <label
              htmlFor={FORM_KEYS.NewPassword}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.NewPassword].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.NewPassword].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.NewPassword}-error`}
          >
            {values[FORM_KEYS.NewPassword].errorMessage}
          </div>
        </div>
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.RetypeNewPassword].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.RetypeNewPassword)}
            onBlur={() => blurHandler(FORM_KEYS.RetypeNewPassword)}
          >
            <input
              type="password"
              name={FORM_KEYS.RetypeNewPassword}
              id={FORM_KEYS.RetypeNewPassword}
              defaultValue={
                userPasswordInformation[FORM_KEYS.RetypeNewPassword]
              }
              onChange={(e) =>
                changeHandler(FORM_KEYS.RetypeNewPassword, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.RetypeNewPassword)}
              data-testid={`${FORM_KEYS.RetypeNewPassword}-input`}
              className={styles["password"]}
            />
            <label
              htmlFor={FORM_KEYS.RetypeNewPassword}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.RetypeNewPassword].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.RetypeNewPassword].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.RetypeNewPassword}-error`}
          >
            {values[FORM_KEYS.RetypeNewPassword].errorMessage}
          </div>
        </div>
        <button
          className={`${formStyles["animated-button"]} ${styles["button"]}`}
          type="submit"
          data-testid="submit"
        >
          Save
        </button>
      </form>
    </section>
  );
};
