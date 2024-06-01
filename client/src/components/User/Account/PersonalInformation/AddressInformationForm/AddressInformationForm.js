import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddressInformationForm.module.css";
import { AddressInformationFormPopup } from "./AddressInformationFormPopup/AddressInformationFormPopup";
import { useState } from "react";

export const AddressInformationForm = () => {
  const [
    displayAddressInformationFormPopup,
    setDisplayAddressInformationFormPopup,
  ] = useState(false);

  const popupClickHandler = async () => {
    document.body.style.overflow = "hidden";
    setDisplayAddressInformationFormPopup(true);
  };

  const popupSubmitHandler = () => {
    document.body.style.overflow = "visible";
    setDisplayAddressInformationFormPopup(false);
  };

  const popupCloseHandler = () => {
    document.body.style.overflow = "visible";
    setDisplayAddressInformationFormPopup(false);
  };

  return (
    <section className={styles["address-container"]}>
      <button className={styles["button"]} onClick={popupClickHandler}>
        <FontAwesomeIcon icon={faCirclePlus} className={styles["icon"]} />
        <span>Add a New Address</span>
      </button>
      {displayAddressInformationFormPopup && (
        <AddressInformationFormPopup
          popupSubmitHandler={popupSubmitHandler}
          popupCloseHandler={popupCloseHandler}
        />
      )}
    </section>
  );
};
