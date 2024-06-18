import styles from "./CardDetailsForm.module.css";
import { paymentServiceFactory } from "../../../services/paymentService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { YearDropdown } from "./YearDropdown/YearDropdown";
import { MonthDropdown } from "./MonthDropdown/MonthDropdown";
import { DynamicFormNotAuthUser } from "../../DynamicForm/DynamicFormNotAuthUser";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useState, useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { hasFormErrorOccurred } from "../../../utils/hasFormErrorOccurred";

export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  const paymentService = useService(paymentServiceFactory);
  const [expirationMonth, setExpirationMonth] = useState(null);
  const [expirationYear, setExpirationYear] = useState(null);

  let {
    values,
    setValues,
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
    setValues(updatedValues);

    updateForm();

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const longCardNumber = values.longCardNumber.fieldValue;
      const cardHolder = values.cardHolder.fieldValue;

      const data = {
        longCardNumber,
        cardHolder,
        expirationMonth,
        expirationYear,
      };

      try {
        await paymentService.confirm(userId, data);
      } catch (err) {
        console.log(err.message);

        updateForm();
      }
    }
  };

  const buttonValue = "Place Order";

  return (
    <section className={styles["card-details-box"]}>
      <h4 className={styles["card-details-title"]}>Card Details</h4>
      <form method="POST" onSubmit={onSubmit} className={styles["card-details-form"]}>
        {Object.entries(FORM_KEYS).map(([key, value]) => (
          <div key={key} className={styles["field-box"]}>
            <div
              className={`${styles["field-container"]} ${
                values[value].errorMessage !== "" ? styles["error"] : ""
              }`.trim()}
              onClick={() => clickHandler(value)}
              onBlur={() => blurHandler(value)}
            >
              <input
                type={values[value].fieldType}
                name={value}
                id={value}
                value={values[key]}
                onChange={(e) => changeHandler(value, e.target.value)}
                onFocus={() => clickHandler(value)}
                data-testid={`${value}-input`}
                className={styles["input"]}
              />
              <label
                htmlFor={value}
                className={`${styles["label"]} ${
                  values[value].isFocused === true ? styles["isFocused"] : ""
                }`.trim()}
              >
                {INITIAL_FORM_VALUES[value].fieldLabel}
              </label>
            </div>
            <div
              className={styles["error-message"]}
              data-testid={`${value}-error`}
            >
              {values[value].errorMessage}
            </div>
            <div
              className={styles["success-message"]}
              data-testid={`${value}-success`}
            >
              {values[value].successMessage}
            </div>
          </div>
        ))}
        <YearDropdown setExpirationYear={setExpirationYear} />
        <MonthDropdown setExpirationMonth={setExpirationMonth} />
        <button
          className={`${styles["animated-button"]} ${styles["button"]}`}
          type="submit"
          data-testid="submit"
        >
          {buttonValue}
        </button>
      </form>
    </section>
  );
};
