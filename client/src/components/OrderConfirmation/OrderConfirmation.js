import { orderConfirmationServiceFactory } from "../../services/orderConfirmationService";
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useBagContext } from "../../contexts/BagContext";

export const OrderConfirmation = () => {
  const orderConfirmationService = useService(orderConfirmationServiceFactory);
  const { userId } = useAuthContext();
  const [currentOrder, setOrder] = useState(null);
  const [currentAddress, setAddress] = useState(null);
  const { clearShoppingBag } = useBagContext();

  useEffect(() => {
    fetchOrderAndAddress();
  }, []);

  const fetchOrderAndAddress = async () => {
    try {
      const { order, address } = await orderConfirmationService.display(userId);

      setOrder(order);
      setAddress(address);
      clearShoppingBag();
    } catch (error) {
      console.error("Error fetching order and address:", error);
    }
  };
  return (
    <h1>{userId}</h1>
  )
}