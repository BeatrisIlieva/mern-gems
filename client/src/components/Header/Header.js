import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { useState } from "react";
import { SearchBoxPopup } from "./SearchBoxPopup/SearchBoxPopup";
import { SearchInput } from "./SearchInput/SearchInput";

export const Header = () => {
  const bagCountGreaterThanZero = true;
  const { isAuthenticated } = useAuthContext();
  const { wishlistCount } = useWishlistContext();
  const { wishlistCountGreaterThanZero } = useWishlistContext();
  const bagCount = 3;
  const user = null;

  const [displayDisplaySearchBoxPopup, setDisplaySearchBoxPopup] =
    useState(false);

  const popupClickHandler = async () => {
    document.body.style.overflow = "hidden";

    setDisplaySearchBoxPopup(true);
  };

  const popupSubmitHandler = async (popupOption) => {
    document.body.style.overflow = "visible";

    setDisplaySearchBoxPopup(false);
  };

  const popupCloseHandler = (popupOption) => {
    document.body.style.overflow = "visible";

    setDisplaySearchBoxPopup(false);
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["header-box"]}>
        <Link to="/">
          <div className={styles["logo-container"]}>
            <img
              className={styles["logo-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1717179026/template_images/Screenshot_2024-05-31_at_21.08.36_nps68o.png"
              }
              alt={"Logo"}
            />
          </div>
        </Link>
        <nav className={styles["nav"]}>
          <ul className={styles["nav-list"]} role="list">
            <li>
              <Link className={styles["nav-item"]} to="/bracelets">
                <h1 className={styles["nav-title"]}>Bracelets</h1>
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/earrings">
                <h1 className={styles["nav-title"]}>Earrings</h1>
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/necklaces">
                <h1 className={styles["nav-title"]}>Necklaces & Pendants</h1>
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/rings">
                <h1 className={styles["nav-title"]}>Rings</h1>
              </Link>
            </li>
          </ul>
        </nav>
        <SearchInput popupClickHandler={popupClickHandler} />
        <ul className={styles["icon-list"]} role="list">
          <li className={`${styles["icon-item-width"]} ${styles["icon-item"]}`}>
            <Link
              className={`${styles["icon-bar-item"]} ${styles["icon-bar-item-no-margin"]}`}
              to={`/wishlist`}
            >
              <span>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={styles["icon-pink"]}
                />
              </span>
              {wishlistCountGreaterThanZero ? (
                <span className={styles["icon-bar-count"]}>
                  ({wishlistCount})
                </span>
              ) : (
                <span className={styles["icon-bar-count"]} />
              )}
            </Link>
          </li>
          <li className={`${styles["icon-item-width"]} ${styles["icon-item"]}`}>
            <Link
              className={styles["icon-bar-item"]}
              to={`/bag/display/${user}`}
            >
              <span>
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className={styles["icon-pink"]}
                />
              </span>
              {bagCountGreaterThanZero && (
                <span className={styles["icon-bar-count"]}>({bagCount})</span>
              )}
            </Link>
          </li>
          {!isAuthenticated && (
            <li className={styles["icon-item"]}>
              <Link className={styles["icon-bar-item"]} to="/user/login">
                <span>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles["icon-pink"]}
                  />
                </span>
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li className={styles["icon-item"]}>
              <Link className={styles["icon-bar-item"]} to="/user/account">
                <span>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles["icon-pink"]}
                  />
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      {displayDisplaySearchBoxPopup && (
        <SearchBoxPopup
          popupSubmitHandler={popupSubmitHandler}
          popupCloseHandler={popupCloseHandler}
        />
      )}
    </header>
  );
};
