import styles from "./OrderSummary.module.css";
import { useBagContext } from "../../contexts/BagContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export const OrderSummary = ({
  firstImageUrl,
  jewelryTitle,
  totalPrice,
  quantity,
  size,
}) => {
  return (
    <section className={styles["order-summary-container"]}>
      <div className={styles["jewelry-bag-image"]}>
        <img
          className={styles["jewelry-bag-img"]}
          src={firstImageUrl}
          alt={firstImageUrl}
        />
      </div>
      <div className={styles["jewelry-bag-composition"]}>
        <h2 className={styles["jewelry-bag-composition-title"]}>
          {jewelryTitle}
        </h2>
        <span className={styles["size-span"]}>Size: {size}</span>
      </div>
      <div className={styles["jewelry-bag-price-quantity"]}>
        <h4 className={styles["jewelry-bag-price"]}>${totalPrice}</h4>
      </div>
      <span className={styles["quantity-span"]}>Qty: {quantity}</span>
    </section>
  );
};
