import { PersonalInformationForm } from "./PersonalInformationForm/PersonalInformationForm";
import styles from "./PersonalInformation.module.css";

export const PersonalInformation = () => {
  return (
    <section className={styles["personal-information-box"]}>
      <div className={styles["left-container"]}>
        <h2 className={styles["form-title"]}>Personal Information</h2>
        <PersonalInformationForm />
      </div>
      <div className={styles["right-container"]}>
        <h2 className={styles["form-title"]}>Address Book</h2>
      </div>
    </section>
  );
};
