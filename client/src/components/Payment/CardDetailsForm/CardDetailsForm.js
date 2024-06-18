import styles from "./CardDetailsForm.module.css";
// import { completeCheckoutServiceFactory } from "../../../services/completeCheckoutService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { YearDropdown } from "./YearDropdown/YearDropdown";
import { MonthDropdown } from "./MonthDropdown/MonthDropdown";

export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  // const completeCheckoutService = useService(completeCheckoutServiceFactory);
  return (
    <section className={styles["card-details-box"]}>
<YearDropdown/>
<MonthDropdown/>
    </section>
  );
};
