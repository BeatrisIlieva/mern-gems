import styles from "./MiniBag.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useBagContext } from "../../../contexts/BagContext";
import { Link } from "react-router-dom";
import { setBodyOverflowVisible } from "../../../utils/useSetBodyOverflow";

export const MiniBag = ({ onClose }) => {
  const { bagItems, totalPrice, totalQuantity } = useBagContext();

  const isVisible = true;

  return (
    <section id={styles["mini-bag"]}>
      <div
        className={`${styles["mini-bag-shadow"]} ${
          isVisible ? styles.active : ""
        }`}
      ></div>
      <div className={styles["mini-bag-dialog"]}>
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <h2 className={styles["popup-title"]}>
                Your Bag
                <span className={styles["popup-items"]}>
                  {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
                </span>
              </h2>
              <div id={styles["xMark"]} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
              </div>
            </div>
            <div className={styles["flex-container-line"]}>
              <hr className={styles["hr-line"]} />
              <img
                className={styles["line-img"]}
                src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                alt=""
              />
              <hr className={styles["hr-line"]} />
            </div>
            <div className={styles["modal-body"]}></div>
            <div className={styles["flex-container-line"]}>
              <hr className={styles["hr-line"]} />
              <img
                className={styles["line-img"]}
                src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                alt=""
              />
              <hr className={styles["hr-line"]} />
            </div>
            <div className={styles["bag-popup-checkout-container"]}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
