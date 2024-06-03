import { PersonalInformationForm } from "./PersonalInformationForm/PersonalInformationForm";
import { AddressInformationForm } from "./AddressInformationForm/AddressInformationForm";
import styles from "./AccountDetails.module.css";
import { EmailInformationForm } from "./EmailInformationForm/EmailInformationForm";
import { PasswordInformationForm } from "./PasswordInformationForm/PasswordInformationForm";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { authServiceFactory } from "../../../../services/authService";
import { useService } from "../../../../hooks/useService";

export const AccountDetails = () => {
  const { userId } = useAuthContext();
  const [userInformation, setUserInformation] = useState([]);
  const authService = useService(authServiceFactory);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);

  useEffect(() => {
    authService
      .find(userId)
      .then((data) => {
        setUserInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  const onUpdateEmailClick = async () => {
    setShowUpdateEmail(true);
    setShowUpdatePassword(false);
  };

  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const onUpdatePasswordClick = async () => {
    setShowUpdatePassword(true);
    setShowUpdateEmail(false);
  };
  return (
    <section className={styles["account-details-box"]}>
      <div className={styles["left-container"]}>
        <h2 className={styles["form-title"]}>Personal Information</h2>
        <PersonalInformationForm />
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["right-top-container"]}>
          <h2 className={styles["form-title"]}>Login Information</h2>
          <h4 className={styles["form-sub-title"]}>Email Address</h4>
          {userInformation.email}
          <div className={styles["button-container"]}>
            <button
              className={styles["button"]}
              onClick={() => onUpdateEmailClick()}
            >
              Update Email Address
            </button>
            <button
              className={styles["button"]}
              onClick={() => onUpdatePasswordClick()}
            >
              Change Password
            </button>
          </div>
          {showUpdateEmail && <EmailInformationForm />}
          {showUpdatePassword && <PasswordInformationForm />}
        </div>
        <div className={styles["right-bottom-container"]}>
          <h2 className={styles["form-title-address"]}>Address Book</h2>
          <AddressInformationForm />
        </div>
      </div>
    </section>
  );
};
