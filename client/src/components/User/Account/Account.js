import styles from "./Account.module.css";
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { LoginInformation } from "./LoginInformation/LoginInformation";

const SUB_MENU_OPTIONS = {
  AccountDetails: "accountDetails",
  LoginPreferences: "loginPreferences",
  OrderHistory: "orderHistory",
};

export const Account = () => {
  const { userId } = useAuthContext();
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState(
    SUB_MENU_OPTIONS.AccountDetails
  );

  const switchSubmenuHandler = (option) => {
    setSelectedSubMenu(option);
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
  }, [userPersonalInformation]);

  return (
    <section className={styles["account-box"]}>
      <div className={styles["top-container"]}>
        <h2 className={styles["title"]}>
          Hi, {userPersonalInformation.firstName}
        </h2>
        <p className={styles["paragraph"]}>
          You can access all your previous orders, set default shipping
          addresses for faster checkout as well as save items to your wishlist
          for quick access.
        </p>
      </div>
      <div className={styles["sub-nav"]}>
        <h3
          className={`${styles["sub-nav-title"]} ${
            selectedSubMenu === SUB_MENU_OPTIONS.LoginPreferences
              ? styles["selected"]
              : ""
          }`.trim()}
          onClick={() =>
            switchSubmenuHandler(SUB_MENU_OPTIONS.LoginPreferences)
          }
        >
          Login Preferences
        </h3>
        <h3
          className={`${styles["sub-nav-title"]} ${
            selectedSubMenu === SUB_MENU_OPTIONS.AccountDetails
              ? styles["selected"]
              : ""
          }`.trim()}
          onClick={() => switchSubmenuHandler(SUB_MENU_OPTIONS.AccountDetails)}
        >
          Account Details
        </h3>
        <h3
          className={`${styles["sub-nav-title"]} ${
            selectedSubMenu === SUB_MENU_OPTIONS.OrderHistory
              ? styles["selected"]
              : ""
          }`.trim()}
          onClick={() => switchSubmenuHandler(SUB_MENU_OPTIONS.OrderHistory)}
        >
          Order History
        </h3>
      </div>
      <div className={styles["bottom-container"]}>
        {selectedSubMenu === SUB_MENU_OPTIONS.AccountDetails && (
          <PersonalInformation />
        )}
        {selectedSubMenu === SUB_MENU_OPTIONS.LoginPreferences && (
          <LoginInformation />
        )}
      </div>
    </section>
  );
};
