import styles from "./DeleteAccountPopup.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const DeleteAccountPopup = ({
  popupSubmitHandler,
  popupCloseHandler,
}) => {
  const { userId } = useAuthContext();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        popupCloseHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupCloseHandler]);

  return (
    <section className={styles["popup-box"]}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <div id={styles["xMark"]} onClick={() => popupCloseHandler()}>
              <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
            </div>
            <h2 className={styles["title"]}>
              Are you sure you want to delete tour Account?
            </h2>
          </div>
          <button>Yes</button>
          <button onClick={() => popupCloseHandler()}>Go Back</button>
        </div>
      </div>
    </section>
  );
};
