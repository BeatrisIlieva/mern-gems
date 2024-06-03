import { PersonalInformationForm } from "./PersonalInformationForm/PersonalInformationForm";
import { AddressInformationForm } from "./AddressInformationForm/AddressInformationForm";
import styles from "./AccountDetails.module.css";
import { EmailInformationForm } from "./EmailInformationForm/EmailInformationForm";
import { PasswordInformationForm } from "./PasswordInformationForm/PasswordInformationForm";
import { useState } from "react";

export const AccountDetails = () => {
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);

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
    <section className={styles["personal-information-box"]}>
      <div className={styles["left-container"]}>
        <h2 className={styles["form-title"]}>Personal Information</h2>
        <PersonalInformationForm />
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["right-top-container"]}>
          <h2 className={styles["form-title-address"]}>Address Book</h2>
          <AddressInformationForm />
        </div>
        <div className={styles["right-bottom-container"]}>
          <button
            onClick={() => onUpdateEmailClick()}
          >
            Update Email Address
          </button>
          <button
            onClick={() => onUpdatePasswordClick()}
          >
            Change Password
          </button>
          {showUpdateEmail && <EmailInformationForm />}
          {showUpdatePassword && <PasswordInformationForm />}
        </div>
      </div>
    </section>
  );
};
