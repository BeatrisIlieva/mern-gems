import styles from "./DynamicForm.module.css";

export const DynamicFormNotAuthUser = ({
  values,
  FORM_KEYS,
  clickHandler,
  blurHandler,
  changeHandler,
  INITIAL_FORM_VALUES,
}) => {
  return (
    <>
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
              type="text"
              name={value}
              id={value}
            //   {values[FORM_KEYS.Email].fieldValue}
              value={values[key]}
              onChange={(e) => changeHandler(value, e.target.value)}
              onFocus={() => clickHandler(value)}
              data-testid={`${value}-input`}
              className={styles["password"]}
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
      <button
        className={`${styles["animated-button"]} ${styles["button"]}`}
        type="submit"
        data-testid="submit"
      >
        Save
      </button>
    </>
  );
};
