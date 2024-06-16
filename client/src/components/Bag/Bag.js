import styles from "./Bag.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { BagTemplate } from "./BagTemplate";
import { Link } from "react-router-dom";
import { useBagContext } from "../../contexts/BagContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Bag = () => {
  const { bagItems, totalPrice, totalQuantity, isEmpty, loading } =
    useBagContext();

  return (
    <section className={styles["bag-box"]}>
      <h2 className={styles["bag-title"]}>Your Bag</h2>
      {!isEmpty ? (
        <div>
          <div className={styles["bag-container"]}>
            <div className={styles["bag-left-container"]}>
              <p className={styles["bag-left-container-title"]}>
                <span
                  className={styles["bag-left-container-title-with-padding"]}
                >
                  <FontAwesomeIcon
                    icon={faTruck}
                    className={styles["dark-pink"]}
                  />
                </span>
                <span
                  className={styles["bag-left-container-title-with-padding"]}
                >
                  Delivery
                </span>
                <span className={styles["delivery-span"]}>
                  ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                </span>
              </p>
              <ul className={styles["bag-left-sub-container"]}>
                {bagItems.map((item) => (
                  <li
                    key={item._id}
                    className={styles["bag-left-sub-left-container"]}
                  >
                    <BagTemplate {...item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles["bag-right-container"]}>
              <div className={styles["bag-right-container-sticky"]}>
                <p className={styles["bag-right-container-title"]}>
                  Order Summary
                </p>
                <div className={styles["bag-right-sub-container"]}>
                  <div className={styles["bag-right-sub-right-container"]}>
                    <p className={styles["bag-right-sub-container-bold"]}>
                      Subtotal
                    </p>
                    <p
                      className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                    >
                      ${totalPrice}
                    </p>
                  </div>
                  <div className={styles["bag-right-sub-right-container"]}>
                    <p>Shipping</p>
                    <p
                      className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-not-bold"]}`}
                    >
                      Complimentary
                    </p>
                  </div>
                  <hr className={styles["horizontal-line"]} />
                  <div className={styles["bag-right-sub-right-container"]}>
                    <p className={styles["bag-right-sub-container-bold"]}>
                      Total
                    </p>
                    <p
                      className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                    >
                      ${totalPrice}
                    </p>
                  </div>
                  <div className={styles["continue-checkout-button-container"]}>
                    {/* <Link to={`/complete-order/${user}`}>
                      <input
                        className={`${styles["button"]} ${styles["pink"]} ${styles["hover"]} ${styles["continue-checkout-button"]}`}
                        type="submit"
                        value="Continue Checkout"
                      />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <LoadingSpinner />}
        </div>
      ) : (
        <>
          <div className={styles["bag-sub-title"]}>
            <h3>Your Shopping Bag is Empty.</h3>
            <p>Explore and add something you love.</p>
          </div>
        </>
      )}
    </section>
  );
};
