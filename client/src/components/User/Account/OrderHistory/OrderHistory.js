import { orderHistoryServiceFactory } from "../../../../services/orderHistoryService";
import { useService } from "../../../../hooks/useService";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useState, useEffect } from "react";

export const OrderHistory = () => {
  const orderHistoryService = useService(orderHistoryServiceFactory);
  const { userId } = useAuthContext();
  const [orderInformation, setOrderInformation] = useState([]);

  useEffect(() => {
    orderHistoryService
      .findAll(userId)
      .then((data) => {
        setOrderInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(orderInformation);
};
