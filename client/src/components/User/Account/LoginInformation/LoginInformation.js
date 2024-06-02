import { EmailInformationForm } from "./EmailInformationForm/EmailInformationForm";
import { PasswordInformationForm } from "./PasswordInformationForm/PasswordInformationForm";
import styles from "./LoginInformation.module.css";

export const LoginInformation = ({ firstName }) => {
  return (
    <section className={styles["login-information-box"]}>
      <div className={styles["left-container"]}>
        <h2 className={styles["form-title"]}>Update Email Address</h2>
        <EmailInformationForm firstName={firstName} />
      </div>
      <div className={styles["right-container"]}>
        <h2 className={styles["form-title"]}>Change Password</h2>
        <PasswordInformationForm firstName={firstName} />
      </div>
    </section>
  );
};
