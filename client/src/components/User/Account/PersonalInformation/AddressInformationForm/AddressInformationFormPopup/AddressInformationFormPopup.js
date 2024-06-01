import styles from "./AddressInformationFormPopup.module.css";

export const AddressInformationFormPopup = ({
  submitHandler,
  closeHandler,
}) => {
  return (
    <section className={styles["popup-box"]}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <h1>Modal</h1>
        </div>
      </div>
    </section>
  );
};
