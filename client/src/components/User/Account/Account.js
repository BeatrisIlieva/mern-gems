import styles from "./Account.module.css";
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";
import { useAuthContext } from "../../../contexts/AuthContext";

export const Account = () => {
  const { userId } = useAuthContext();
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);

  useEffect(() => {
    personalInformationService
      .find(userId)
      .then((data) => {
        setUserPersonalInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userPersonalInformation]);

  return (
    <section className={styles["account-box"]}>
      <div className={styles["top-container"]}>
        <h2 className={styles["title"]}>Hi, {userPersonalInformation.firstName}</h2>
        <p className={styles["paragraph"]}>
          You can access all your previous orders, set default shipping
          addresses for faster checkout as well as save items to your wishlist
          for quick access.
        </p>
      </div>
      <div className={styles["sub-nav"]}>
        <h3>Account Details</h3>
        <h3>Order History</h3>
      </div>
    </section>
  );
};
