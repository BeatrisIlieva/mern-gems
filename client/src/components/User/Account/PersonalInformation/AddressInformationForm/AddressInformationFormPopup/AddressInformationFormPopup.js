import styles from "./AddressInformationFormPopup.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { useService } from "../../../../../../hooks/useService";
import { addressInformationServiceFactory } from "../../../../../../services/addressInformationService";
import { getErrorMessage } from "../../../../../../hooks/useFormValidator";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import formStyles from "../../../../../../commonCSS/forms.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const AddressInformationFormPopup = ({
  popupSubmitHandler,
  popupCloseHandler,
}) => {
  const { userId } = useAuthContext();
  const addressInformationService = useService(
    addressInformationServiceFactory
  );
  const [userAddressInformation, setUserAddressInformation] = useState([]);
  const [values, setValues] = useState(INITIAL_FORM_VALUES);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        popupCloseHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupCloseHandler]);

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
    addressInformationService
      .find(userId)
      .then((data) => {
        setUserAddressInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userAddressInformation]);

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
      const phoneNumber = values.phoneNumber.fieldValue;
      const country = values.country.fieldValue;
      const city = values.city.fieldValue;
      const street = values.street.fieldValue;
      const zipCode = values.zipCode.fieldValue;

      const data = {
        phoneNumber,
        country,
        city,
        street,
        zipCode,
      };
      try {
        await addressInformationService.update(userId, data);
        popupSubmitHandler();
      } catch (err) {
        console.log(err.message);
        const updatedValues = { ...values };
        setValues(updatedValues);
        updateForm();
      }
    }
  };

  return (
    <section className={styles["popup-box"]}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <div id={styles["xMark"]} onClick={() => popupCloseHandler()}>
              <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
            </div>
            <h2 className={styles["title"]}>Add a New Address</h2>
          </div>
          <form
            method="POST"
            onSubmit={submitHandler}
            className={styles["form-container"]}
          >
            <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
              <div
                className={`${formStyles["field-container"]} ${
                  values[FORM_KEYS.Country].errorMessage !== ""
                    ? formStyles["error"]
                    : ""
                }`.trim()}
                onClick={() => clickHandler(FORM_KEYS.Country)}
                onBlur={() => blurHandler(FORM_KEYS.Country)}
              >
                <input
                  type="text"
                  name={FORM_KEYS.Country}
                  id={FORM_KEYS.Country}
                  defaultValue={userAddressInformation[FORM_KEYS.Country]}
                  onChange={(e) =>
                    changeHandler(FORM_KEYS.Country, e.target.value)
                  }
                  onFocus={() => clickHandler(FORM_KEYS.Country)}
                  data-testid={`${FORM_KEYS.Country}-input`}
                />
                <label
                  htmlFor={FORM_KEYS.Country}
                  className={`${formStyles["label"]} ${
                    values[FORM_KEYS.Country].isFocused === true
                      ? formStyles["isFocused"]
                      : ""
                  }`.trim()}
                >
                  {INITIAL_FORM_VALUES[FORM_KEYS.Country].fieldLabel}
                </label>
              </div>
              <div
                className={formStyles["error-message"]}
                data-testid={`${FORM_KEYS.Country}-error`}
              >
                {values[FORM_KEYS.Country].errorMessage}
              </div>
            </div>
            <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
              <div
                className={`${formStyles["field-container"]} ${
                  values[FORM_KEYS.City].errorMessage !== ""
                    ? formStyles["error"]
                    : ""
                }`.trim()}
                onClick={() => clickHandler(FORM_KEYS.City)}
                onBlur={() => blurHandler(FORM_KEYS.City)}
              >
                <input
                  type="text"
                  name={FORM_KEYS.City}
                  id={FORM_KEYS.City}
                  defaultValue={userAddressInformation[FORM_KEYS.City]}
                  onChange={(e) =>
                    changeHandler(FORM_KEYS.City, e.target.value)
                  }
                  onFocus={() => clickHandler(FORM_KEYS.City)}
                  data-testid={`${FORM_KEYS.City}-input`}
                />
                <label
                  htmlFor={FORM_KEYS.City}
                  className={`${formStyles["label"]} ${
                    values[FORM_KEYS.City].isFocused === true
                      ? formStyles["isFocused"]
                      : ""
                  }`.trim()}
                >
                  {INITIAL_FORM_VALUES[FORM_KEYS.City].fieldLabel}
                </label>
              </div>
              <div
                className={formStyles["error-message"]}
                data-testid={`${FORM_KEYS.City}-error`}
              >
                {values[FORM_KEYS.City].errorMessage}
              </div>
            </div>
            <div className={styles["field-box-full"]}>
              <div
                className={`${formStyles["field-container"]} ${
                  values[FORM_KEYS.Street].errorMessage !== ""
                    ? formStyles["error"]
                    : ""
                }`.trim()}
                onClick={() => clickHandler(FORM_KEYS.Street)}
                onBlur={() => blurHandler(FORM_KEYS.Street)}
              >
                <input
                  type="text"
                  name={FORM_KEYS.Street}
                  id={FORM_KEYS.Street}
                  defaultValue={userAddressInformation[FORM_KEYS.Street]}
                  onChange={(e) =>
                    changeHandler(FORM_KEYS.Street, e.target.value)
                  }
                  onFocus={() => clickHandler(FORM_KEYS.Street)}
                  data-testid={`${FORM_KEYS.Street}-input`}
                />
                <label
                  htmlFor={FORM_KEYS.Street}
                  className={`${formStyles["label"]} ${
                    values[FORM_KEYS.Street].isFocused === true
                      ? formStyles["isFocused"]
                      : ""
                  }`.trim()}
                >
                  {INITIAL_FORM_VALUES[FORM_KEYS.Street].fieldLabel}
                </label>
              </div>
              <div
                className={formStyles["error-message"]}
                data-testid={`${FORM_KEYS.Street}-error`}
              >
                {values[FORM_KEYS.Street].errorMessage}
              </div>
            </div>
            <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
              <div
                className={`${formStyles["field-container"]} ${
                  values[FORM_KEYS.ZipCode].errorMessage !== ""
                    ? formStyles["error"]
                    : ""
                }`.trim()}
                onClick={() => clickHandler(FORM_KEYS.ZipCode)}
                onBlur={() => blurHandler(FORM_KEYS.ZipCode)}
              >
                <input
                  type="text"
                  name={FORM_KEYS.ZipCode}
                  id={FORM_KEYS.ZipCode}
                  defaultValue={userAddressInformation[FORM_KEYS.ZipCode]}
                  onChange={(e) =>
                    changeHandler(FORM_KEYS.ZipCode, e.target.value)
                  }
                  onFocus={() => clickHandler(FORM_KEYS.ZipCode)}
                  data-testid={`${FORM_KEYS.ZipCode}-input`}
                />
                <label
                  htmlFor={FORM_KEYS.ZipCode}
                  className={`${formStyles["label"]} ${
                    values[FORM_KEYS.ZipCode].isFocused === true
                      ? formStyles["isFocused"]
                      : ""
                  }`.trim()}
                >
                  {INITIAL_FORM_VALUES[FORM_KEYS.ZipCode].fieldLabel}
                </label>
              </div>
              <div
                className={formStyles["error-message"]}
                data-testid={`${FORM_KEYS.ZipCode}-error`}
              >
                {values[FORM_KEYS.ZipCode].errorMessage}
              </div>
            </div>
            <div className={`${formStyles["field-box"]} ${styles["half"]}`}>
              <div
                className={`${formStyles["field-container"]} ${
                  values[FORM_KEYS.PhoneNumber].errorMessage !== ""
                    ? formStyles["error"]
                    : ""
                }`.trim()}
                onClick={() => clickHandler(FORM_KEYS.PhoneNumber)}
                onBlur={() => blurHandler(FORM_KEYS.PhoneNumber)}
              >
                <input
                  type="text"
                  name={FORM_KEYS.PhoneNumber}
                  id={FORM_KEYS.PhoneNumber}
                  defaultValue={userAddressInformation[FORM_KEYS.PhoneNumber]}
                  onChange={(e) =>
                    changeHandler(FORM_KEYS.PhoneNumber, e.target.value)
                  }
                  onFocus={() => clickHandler(FORM_KEYS.PhoneNumber)}
                  data-testid={`${FORM_KEYS.PhoneNumber}-input`}
                />
                <label
                  htmlFor={FORM_KEYS.PhoneNumber}
                  className={`${formStyles["label"]} ${
                    values[FORM_KEYS.PhoneNumber].isFocused === true
                      ? formStyles["isFocused"]
                      : ""
                  }`.trim()}
                >
                  {INITIAL_FORM_VALUES[FORM_KEYS.PhoneNumber].fieldLabel}
                </label>
              </div>
              <div
                className={formStyles["error-message"]}
                data-testid={`${FORM_KEYS.PhoneNumber}-error`}
              >
                {values[FORM_KEYS.PhoneNumber].errorMessage}
              </div>
            </div>
            <div className={styles["button-container"]}>
              <button
                className={`${formStyles["animated-button"]} ${styles["button"]}`}
                type="submit"
                data-testid="submit"
              >
                Save
              </button>
              <button
                onClick={() => popupCloseHandler()}
                className={formStyles["dismiss-button"]}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
