import { orderConfirmationServiceFactory } from "../../services/orderConfirmationService";
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useBagContext } from "../../contexts/BagContext";
import styles from "./OrderConfirmation.module.css";
import { personalInformationServiceFactory } from "../../services/personalInformationService";

export const OrderConfirmation = () => {
  const orderConfirmationService = useService(orderConfirmationServiceFactory);
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);
  const { userId } = useAuthContext();
  const [order, setOrder] = useState(null);
  const { clearShoppingBag } = useBagContext();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const order = await orderConfirmationService.display(userId);

      setOrder(order);

      clearShoppingBag();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    personalInformationService
      .find(userId)
      .then((data) => {
        setUserPersonalInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {order && userPersonalInformation && (
        <section className={styles["order-details-section"]}>
          <div className={styles["order-title-content"]}>
            <h4>
              Thank you for your purchase, {userPersonalInformation.firstName}!
            </h4>
          </div>
          <div className={styles["order-details-wrapper"]}>
            <div>
              <h5 className={styles["order-subtitle-content"]}>
                Order Confirmation:
              </h5>
              <p className={styles["order-info"]}>
                Your order ID: #{order._id}
                has been successfully placed.
              </p>
              <p>
                You can find all the details and track the status of your
                purchase in your account under the 'Order History' menu.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
