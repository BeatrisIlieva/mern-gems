import { PersonalInformationForm } from "./PersonalInformationForm/PersonalInformationForm";
import { AddressInformationForm } from "./AddressInformationForm/AddressInformationForm";
import styles from "./AccountDetails.module.css";
import { EmailInformationForm } from "./EmailInformationForm/EmailInformationForm";
import { PasswordInformationForm } from "./PasswordInformationForm/PasswordInformationForm";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useService } from "../../../../hooks/useService";
import { DeleteAccountPopup } from "./DeleteAccountPopup/DeleteAccountPopup";
import { loginInformationServiceFactory } from "../../../../services/loginInformationService";

export const AccountDetails = () => {
  const { userId, onDelete } = useAuthContext();
  const [userInformation, setUserInformation] = useState([]);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const loginInformationService = useService(loginInformationServiceFactory);

  const [displayDeleteAccountPopup, setDisplayDeleteAccountPopup] =
    useState(false);

  useEffect(() => {
    loginInformationService
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

  const onUpdatePasswordClick = async () => {
    setShowUpdatePassword(true);
    setShowUpdateEmail(false);
  };

  const popupClickHandler = async () => {
    document.body.style.overflow = "hidden";
    setDisplayDeleteAccountPopup(true);
  };

  const popupSubmitHandler = async () => {
    document.body.style.overflow = "visible";

    setDisplayDeleteAccountPopup(false);

    await onDelete();
  };

  const popupCloseHandler = () => {
    document.body.style.overflow = "visible";
    setDisplayDeleteAccountPopup(false);
  };

  return (
    <section className={styles["account-details-box"]}>
      <div className={styles["left-container"]}>
        <div className={styles["left-top-container"]}>
          <h2
            className={styles["form-title"]}
            data-testid="personal-information-title"
          >
            Personal Information
          </h2>
          <PersonalInformationForm />
        </div>
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["right-top-container"]}>
          <h2 className={styles["form-title-login-information"]}>
            Login Information
          </h2>
          <h4 className={styles["form-sub-title"]}>Email Address</h4>
          <p className={styles["email"]} data-testid="user-email">
            {userInformation.email}
          </p>
          <div className={styles["button-container"]}>
            <button
              className={styles["button"]}
              onClick={() => onUpdateEmailClick()}
              data-testid="update-email-button"
            >
              Update Email Address
            </button>
            <button
              className={styles["button"]}
              onClick={() => onUpdatePasswordClick()}
              data-testid="update-password-button"
            >
              Change Password
            </button>
            <button className={styles["button"]} onClick={popupClickHandler}>
              Delete Account
            </button>
            {displayDeleteAccountPopup && (
              <DeleteAccountPopup
                popupSubmitHandler={popupSubmitHandler}
                popupCloseHandler={popupCloseHandler}
              />
            )}
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
