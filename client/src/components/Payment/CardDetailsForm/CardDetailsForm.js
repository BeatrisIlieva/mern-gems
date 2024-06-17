import styles from "./CardDetails.module.css";
// import { completeCheckoutServiceFactory } from "../../../services/completeCheckoutService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { DayDropdown } from "../../DayDropdown/DayDropdown";
import { MonthDropdown } from "../../MonthDropdown/MonthDropdown";

export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  // const completeCheckoutService = useService(completeCheckoutServiceFactory);
  return (
    <>
      {" "}
      <DayDropdown />
      <MonthDropdown />
    </>
  );
};
