import styles from "./CardDetailsForm.module.css";
import { paymentServiceFactory } from "../../../services/paymentService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { YearDropdown } from "./YearDropdown/YearDropdown";
import { MonthDropdown } from "./MonthDropdown/MonthDropdown";

export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  // const completeCheckoutService = useService(completeCheckoutServiceFactory);
  const buttonValue = "Place Order";
  return (
    <section className={styles["card-details-box"]}>
      <YearDropdown />
      <MonthDropdown />
      <form method="POST" onSubmit={onSubmit}>
        <DynamicFormNotAuthUser
          values={values}
          formKeys={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
          buttonValue={buttonValue}
        />
      </form>
    </section>
  );
};
