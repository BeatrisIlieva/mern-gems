import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddressInformationForm.module.css";

export const AddressInformationForm = () => {
  return (
    <section className={styles["address-container"]}>
      <button className={styles["button"]}>
        <FontAwesomeIcon icon={faCirclePlus} className={styles["icon"]} />
        <span>Add a New Address</span>
      </button>
    </section>
  );
};
