import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";
import { getErrorMessage } from "../../../../../hooks/useFormValidator";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import formStyles from "../../../../../commonCSS/forms.module.css";
import styles from "./EmailInformationForm.module.css";
import { useForm } from "../../../../../hooks/useForm";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";

export const EmailInformationForm = () => {
  const { userId } = useAuthContext();
  const loginInformationService = useService(loginInformationServiceFactory);
  const [userEmailInformation, setUserEmailInformation] = useState([]);
  // const [values, setValues] = useState(INITIAL_FORM_VALUES);

  const {
    values,
    setValues,
    errorOccurred,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  // const updateForm = () => {
  //   Object.keys(values).forEach((fieldKey) => {
  //     const input = document.getElementById(fieldKey);

  //     if (input.value !== "") {
  //       setValues((prevValues) => ({
  //         ...prevValues,
  //         [fieldKey]: {
  //           ...prevValues[fieldKey],
  //           fieldValue: input.value,
  //           isFocused: true,
  //         },
  //       }));
  //     }
  //   });
  // };

  useEffect(() => {
    loginInformationService
      .find(userId)
      .then((data) => {
        setUserEmailInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userEmailInformation]);

  // const clickHandler = (fieldKey) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [fieldKey]: { ...prevValues[fieldKey], isFocused: true },
  //   }));
  // };

  // const blurHandler = (fieldKey) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [fieldKey]: {
  //       ...prevValues[fieldKey],
  //       isFocused: prevValues[fieldKey].fieldValue !== "",
  //     },
  //   }));
  // };

  // const changeHandler = (fieldKey, newValue) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [fieldKey]: { ...prevValues[fieldKey], fieldValue: newValue },
  //   }));
  //   updateForm();
  // };

  const onSubmit = async (e) => {
    submitHandler(e);

    const updatedValues = { ...values };

    // let hasErrorOccurred = false;

    // Object.keys(values).forEach((key) => {
    //   const field = values[key];

    //   field.errorMessage = getErrorMessage(
    //     key,
    //     field.fieldValue,
    //     field.regexPattern
    //   );

    //   if (field.errorMessage !== "") {
    //     hasErrorOccurred = true;
    //   }
    // });

    if (errorOccurred) {
      errorOccurred = false;
      setValues(updatedValues);

      return;
    } else {
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;

      const data = { email, password };
      try {
        await loginInformationService.updateEmail(userId, data);
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
            <form method="POST" onSubmit={onSubmit}>
        <DynamicFormAuthUser
          values={values}
          FORM_KEYS={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
          userInformation={userEmailInformation}
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
              values[FORM_KEYS.Email].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.Email)}
            onBlur={() => blurHandler(FORM_KEYS.Email)}
          >
            <input
              type="text"
              name={FORM_KEYS.Email}
              id={FORM_KEYS.Email}
              defaultValue={userEmailInformation[FORM_KEYS.Email]}
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
              defaultValue={userEmailInformation[FORM_KEYS.Password]}
              onChange={(e) =>
                changeHandler(FORM_KEYS.Password, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.Password)}
              data-testid={`${FORM_KEYS.Password}-input`}
              className={styles["password"]}
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
          Save
        </button>
      </form> */}
    </section>
  );
};
