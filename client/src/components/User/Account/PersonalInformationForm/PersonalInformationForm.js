import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useService } from "../../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../../services/personalInformationService";
import { getErrorMessage } from "../../../../hooks/useFormValidator";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import formStyles from "../../../../commonCSS/forms.module.css";
import styles from "./PersonalInformationForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export const PersonalInformationForm = () => {
  const { userId } = useAuthContext();
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);
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
    personalInformationService
      .find(userId)
      .then((data) => {
        // const updatedValues = { ...values };
              
        // for (let fieldKey in FORM_KEYS) {
            
        //   updatedValues[FORM_KEYS[fieldKey]] = {
        //     ...updatedValues[FORM_KEYS[fieldKey]],
        //     fieldValue: data[FORM_KEYS[fieldKey]],
        //     isFocused: data[FORM_KEYS[fieldKey]] !== "",
        //   };
        // }
        // setValues(updatedValues);
        
        setUserPersonalInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userPersonalInformation]);

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

    if (hasErrorOccurred) {
      setValues(updatedValues);

      return;
    } else {
      const firstName = values.firstName.fieldValue;
      const lastName = values.lastName.fieldValue;
      const birthday = values.birthday.fieldValue;
      const specialDay = values.specialDay.fieldValue;

      const data = { firstName, lastName, birthday, specialDay };
      try {
        await personalInformationService.update(userId, data);
      } catch (err) {
        console.log(err.message);
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
              defaultValue={userPersonalInformation[FORM_KEYS.FirstName]}
            //   value={values[FORM_KEYS.FirstName].fieldValue}
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
              defaultValue={userPersonalInformation[FORM_KEYS.LastName]}
            //   value={values[FORM_KEYS.LastName].fieldValue}
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
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.Birthday].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.Birthday)}
            onBlur={() => blurHandler(FORM_KEYS.Birthday)}
          >
            <input
              type="text"
              name={FORM_KEYS.Birthday}
              id={FORM_KEYS.Birthday}
              defaultValue={userPersonalInformation[FORM_KEYS.Birthday]}
            //   value={values[FORM_KEYS.Birthday].fieldValue}
              onChange={(e) =>
                changeHandler(FORM_KEYS.Birthday, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.Birthday)}
              data-testid={`${FORM_KEYS.Birthday}-input`}
            />
            <label
              htmlFor={FORM_KEYS.Birthday}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.Birthday].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.Birthday].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.Birthday}-error`}
          >
            {values[FORM_KEYS.Birthday].errorMessage}
          </div>
        </div>
        <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
          <div
            className={`${formStyles["field-container"]} ${
              values[FORM_KEYS.SpecialDay].errorMessage !== ""
                ? formStyles["error"]
                : ""
            }`.trim()}
            onClick={() => clickHandler(FORM_KEYS.SpecialDay)}
            onBlur={() => blurHandler(FORM_KEYS.SpecialDay)}
          >
            <input
              type="text"
              name={FORM_KEYS.SpecialDay}
              id={FORM_KEYS.SpecialDay}
              defaultValue={userPersonalInformation[FORM_KEYS.SpecialDay]}
              onChange={(e) =>
                changeHandler(FORM_KEYS.SpecialDay, e.target.value)
              }
              onFocus={() => clickHandler(FORM_KEYS.SpecialDay)}
              data-testid={`${FORM_KEYS.SpecialDay}-input`}
            />
            <label
              htmlFor={FORM_KEYS.SpecialDay}
              className={`${formStyles["label"]} ${
                values[FORM_KEYS.SpecialDay].isFocused === true
                  ? formStyles["isFocused"]
                  : ""
              }`.trim()}
            >
              {INITIAL_FORM_VALUES[FORM_KEYS.SpecialDay].fieldLabel}
            </label>
          </div>
          <div
            className={formStyles["error-message"]}
            data-testid={`${FORM_KEYS.SpecialDay}-error`}
          >
            {values[FORM_KEYS.SpecialDay].errorMessage}
          </div>
        </div>
        <button
          className={`${formStyles["animated-button"]} ${styles["button"]}`}
          type="submit"
          data-testid="submit"
        >
          Create an Account
        </button>
      </form>
    </section>
  );
};
