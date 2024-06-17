import styles from "./CardDetails.module.css";
// import { completeCheckoutServiceFactory } from "../../../services/completeCheckoutService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";


export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  // const completeCheckoutService = useService(completeCheckoutServiceFactory);
  

};
