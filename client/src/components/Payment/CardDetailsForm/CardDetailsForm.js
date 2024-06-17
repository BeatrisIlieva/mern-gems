import styles from "./CardDetails.module.css";
import { useFormNotAuthUser } from "../../../hooks/useFormNotAuthUser";
import { completeCheckoutServiceFactory } from "../../../services/completeCheckoutService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  validateLongCardNumber,
  validateExpirationDate,
  validateCVVCode,
} from "./CardDetailsFormValidators";

const FormKeys = {
  LongCardNumber: "longCardNumber",
  ExpirationDate: "expirationDate",
  CvvCode: "cvvCode",
};

export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  const completeCheckoutService = useService(completeCheckoutServiceFactory);
  const navigate = useNavigate();

  const onConfirmCheckoutSubmit = async (values) => {
    const longCardNumber = values.longCardNumber.value;
    const expirationDate = values.expirationDate.value;
    const cvvCode = values.cvvCode.value;
    const data = { longCardNumber, expirationDate, cvvCode };

    try {
      values[FormKeys.LongCardNumber].error = validateLongCardNumber(
        values[FormKeys.LongCardNumber].value
      );

      values[FormKeys.ExpirationDate].error = validateExpirationDate(
        values[FormKeys.ExpirationDate].value
      );

      values[FormKeys.CvvCode].error = validateCVVCode(
        values[FormKeys.CvvCode].value
      );

      if (
        values[FormKeys.LongCardNumber].error === null &&
        values[FormKeys.ExpirationDate].error === null &&
        values[FormKeys.CvvCode].error === null
      ) {
        await completeCheckoutService.confirm(userId, data);
        navigate(`/order-confirmation/${userId}`);
      }
    } catch (err) {
      console.log(err);
    }

    const currentValues = { ...values };

    setValues(currentValues);
  };

  const {
    values,
    changeHandler,
    onFocusField,
    onBlurField,
    onSubmit,
    setValues,
  } = useFormNotAuthUser(
    {
      [FormKeys.LongCardNumber]: { value: "", focusField: false, error: null },
      [FormKeys.ExpirationDate]: { value: "", focusField: false, error: null },
      [FormKeys.CvvCode]: { value: "", focusField: false, error: null },
    },

    onConfirmCheckoutSubmit
  );

  return (
    <section id={styles["shipping-details-box"]}>
      {values && (
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-body"]}>
              <form
                method="POST"
                onSubmit={onSubmit}
                className={styles["address-book-box"]}
              >
                <div className={`${styles["filed-box"]}`}>
                  <div
                    className={`${styles["filed-container"]} ${
                      values[FormKeys.LongCardNumber].error
                        ? styles["error"]
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("longCardNumber")}
                      onBlur={onBlurField}
                      className={styles["input-field-container-card"]}
                    >
                      <p
                        className={
                          values[FormKeys.LongCardNumber]["focusField"]
                            ? styles["placeholder-on-blur"]
                            : styles["placeholder"]
                        }
                      >
                        Enter Valid Card Number*
                      </p>
                      {values[FormKeys.LongCardNumber]["focusField"] && (
                        <input
                          className={styles["input-spot"]}
                          type="text"
                          name={FormKeys.LongCardNumber}
                          id="longCardNumber"
                          value={values[FormKeys.LongCardNumber].value}
                          onChange={(e) =>
                            changeHandler(
                              FormKeys.LongCardNumber,
                              e.target.value
                            )
                          }
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                  {/* <div className={`${styles["error-message"]} ${values[FormKeys.LongCardNumber].error ? styles["visible"] : ""}`}>{values[FormKeys.LongCardNumber].error}</div> */}
                  {values[FormKeys.LongCardNumber].error && (
                    <div className={styles["error-message"]}>
                      {values[FormKeys.LongCardNumber].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["filed-box"]}`}>
                  <div
                    className={`${styles["filed-container"]} ${
                      values[FormKeys.ExpirationDate].error
                        ? styles["error"]
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("expirationDate")}
                      onBlur={onBlurField}
                      className={styles["input-field-container-card"]}
                    >
                      <p
                        className={
                          values[FormKeys.ExpirationDate]["focusField"]
                            ? styles["placeholder-on-blur"]
                            : styles["placeholder"]
                        }
                      >
                        Enter Expiration Date*
                      </p>
                      {values[FormKeys.ExpirationDate]["focusField"] && (
                        <input
                          className={styles["input-spot"]}
                          type="text"
                          name={FormKeys.ExpirationDate}
                          id="expirationDate"
                          value={values[FormKeys.ExpirationDate].value}
                          onChange={(e) =>
                            changeHandler(
                              FormKeys.ExpirationDate,
                              e.target.value
                            )
                          }
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                  {values[FormKeys.ExpirationDate].error && (
                    <div className={styles["error-message"]}>
                      {values[FormKeys.ExpirationDate].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["filed-box"]}`}>
                  <div
                    className={`${styles["filed-container"]} ${
                      values[FormKeys.CvvCode].error ? styles["error"] : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("cvvCode")}
                      onBlur={onBlurField}
                      className={styles["input-field-container-card"]}
                    >
                      <p
                        className={
                          values[FormKeys.CvvCode]["focusField"]
                            ? styles["placeholder-on-blur"]
                            : styles["placeholder"]
                        }
                      >
                        Enter CVV Code*
                      </p>
                      {values[FormKeys.CvvCode]["focusField"] && (
                        <input
                          className={styles["input-spot"]}
                          type="text"
                          name={FormKeys.CvvCode}
                          id="cvvCode"
                          value={values[FormKeys.CvvCode].value}
                          onChange={(e) =>
                            changeHandler(FormKeys.CvvCode, e.target.value)
                          }
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                  {values[FormKeys.CvvCode].error && (
                    <div className={styles["error-message"]}>
                      {values[FormKeys.CvvCode].error}
                    </div>
                  )}
                </div>
                <div className={styles["center"]}>
                  <div>
                    <input
                      className={`${styles["button"]} ${styles["save"]} ${styles["pink"]} ${styles["hover"]}`}
                      type="submit"
                      value="Confirm"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
