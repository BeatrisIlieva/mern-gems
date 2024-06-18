import { orderConfirmationServiceFactory } from "../../../../services/orderConfirmationService";
import { useService } from "../../../../hooks/useService";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useState, useEffect } from "react";

export const OrderHistory = () => {
  const orderConfirmationService = useService(orderConfirmationServiceFactory);
  const { userId } = useAuthContext();
  const [orderInformation, setOrderInformation] = useState([]);

  useEffect(() => {
    orderConfirmationService
      .find(userId)
      .then((data) => {
        setOrderInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
};
