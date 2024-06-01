import styles from "./Account.module.css";
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";
import { useAuthContext } from "../../../contexts/AuthContext";

export const Account = () => {
  const {userId} = useAuthContext();
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
        <h2>Hi, {userPersonalInformation.firstName}</h2>
      </div>
    </section>
  );
};
