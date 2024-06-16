import styles from "./Bag.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { BagTemplate } from "./BagTemplate";
import { Link } from "react-router-dom";
import { useBagContext } from "../../contexts/BagContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Bag = () => {
  const {bagItems, totalPrice, totalQuantity, isEmpty, loading} =
    useBagContext();


  return (
    <>
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
          {loading && (
          <LoadingSpinner />)}
        </div>
      ) : (
        <>
          <div className={styles["bag-sub-title"]}>
            <h3>Your Shopping Bag is Empty.</h3>
            <p>Explore and add something you love.</p>
          </div>
          <div className={styles["discover-container"]}>
            <div>
              <button
                className={`${styles["button"]} ${styles["pink"]} ${styles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Earrings
              </button>
              <div className={styles["discover-image"]}>
                <img
                  className={styles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272200/discover/diamond_loop_earrings_diamond_eadprddbllp_e-2_j4ugmv.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <button
                className={`${styles["button"]} ${styles["pink"]} ${styles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Necklaces
              </button>
              <div className={styles["discover-image"]}>
                <img
                  className={styles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272200/discover/sparkling_cluster_necklace_diamond_nkdpclrfspc_e-1_ztc7kf.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <button
                className={`${styles["button"]} ${styles["pink"]} ${styles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Bracelets
              </button>
              <div className={styles["discover-image"]}>
                <img
                  className={styles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272200/discover/sunflower-_bracelet_diamond_brdpnasmsf_e-1_copy_zrzmxp.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <button
                className={`${styles["button"]} ${styles["pink"]} ${styles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Rings
              </button>
              <div className={styles["discover-image"]}>
                <img
                  className={styles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272201/discover/sunflower-_ring_diamond_frdpnalgsf_e-2_pstw37.webp"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
