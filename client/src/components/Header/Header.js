import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { useBagContext } from "../../contexts/BagContext";
import { useState, useEffect } from "react";
import { SearchBoxPopup } from "./SearchBoxPopup/SearchBoxPopup";
import { SearchInput } from "./SearchInput/SearchInput";
import { MiniHeader } from "./MiniHeader/MiniHeader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export const Header = () => {
  const { isAuthenticated } = useAuthContext();
  const { wishlistCount, wishlistCountGreaterThanZero } = useWishlistContext();
  const { totalQuantity } = useBagContext();
  const [displayDisplaySearchBoxPopup, setDisplaySearchBoxPopup] =
    useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10 && currentScrollY > lastScrollY) {
        setIsScrolled(true);
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
        setIsScrollingUp(true);
      } else if (currentScrollY === 0) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const popupClickHandler = async () => {
    document.body.style.overflow = "hidden";

    setDisplaySearchBoxPopup(true);
  };

  const popupCloseHandler = () => {
    document.body.style.overflow = "visible";

    setDisplaySearchBoxPopup(false);
  };

  return (
    <>
      {isScrolled ? (
        <MiniHeader />
      ) : (
        <header className={styles["header"]}>
          <div className={styles["header-box"]}>
            <div className={styles["top-container"]}>
              <Link to="/">
                <div className={styles["logo-container"]}>
                  <img
                    className={styles["logo-img"]}
                    src={
                      "https://res.cloudinary.com/deztgvefu/image/upload/v1719057213/template_images/Screenshot_2024-06-22_at_14.52.43_xrdvgt.png"
                    }
                    alt={"Logo"}
                  />
                </div>
              </Link>
            </div>
            <div className={styles["bottom-container"]}>
              <div
                className={`${styles["icon-item-width"]} ${styles["icon-item"]} ${styles["search-container"]}`}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={styles["icon-pink"]}
                    onClick={popupClickHandler}
                  />{" "}
                  <span
                    className={styles["text-span"]}
                    onClick={popupClickHandler}
                  >
                    Search
                  </span>
                </span>
              </div>
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
                      <h1 className={styles["nav-title"]}>
                        Necklaces & Pendants
                      </h1>
                    </Link>
                  </li>
                  <li>
                    <Link className={styles["nav-item"]} to="/rings">
                      <h1 className={styles["nav-title"]}>Rings</h1>
                    </Link>
                  </li>
                </ul>
              </nav>
              <ul className={styles["icon-list"]} role="list">
                <li
                  className={`${styles["icon-item-width"]} ${styles["icon-item"]}`}
                >
                  <Link
                    className={`${styles["icon-bar-item"]} ${styles["icon-bar-item-no-margin"]}`}
                    to={"/user/wishlist"}
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
                <li
                  className={`${styles["icon-item"]}`}
                >
                  <Link
                    className={styles["icon-bar-item"]}
                    to={"/user/shopping-bag"}
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={faBagShopping}
                        className={styles["icon-pink"]}
                      />
                    </span>
                    <span className={styles["text-span"]}>My Bag</span>
                    <span className={styles["icon-bar-count"]}>
                      ({totalQuantity})
                    </span>
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
                      <span className={styles["text-span"]}>Sign In</span>
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li className={styles["icon-item"]}>
                    <Link
                      className={styles["icon-bar-item"]}
                      to="/user/account"
                    >
                      <span>
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles["icon-pink"]}
                        />
                      </span>
                      <span className={styles["text-span"]}>Account</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {displayDisplaySearchBoxPopup && (
            <SearchBoxPopup popupCloseHandler={popupCloseHandler} />
          )}
        </header>
      )}
    </>
  );
};
