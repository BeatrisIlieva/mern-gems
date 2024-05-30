import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const wishListCountGreaterThanZero = true;
  const bagCountGreaterThanZero = true;
  const isAuthenticated = false;
  const wishlistCount = 11;
  const bagCount = 2;
  const user = null;

  return (
    <header className={styles["header"]}>
      <div className={styles["header-box"]}>
        <Link to="/">
          <div className={styles["logo-box"]}>
            <div className={styles["logo-container"]}>
              <img
                className={styles["logo-img"]}
                src={
                  "https://res.cloudinary.com/deztgvefu/image/upload/v1714938711/template_images/Untitled_design_t0jumi.png"
                }
                alt={"Logo"}
              />
            </div>
          </div>
        </Link>
        <nav className={styles["nav-box"]}>
          <ul className={styles["nav-list"]} role="list">
            <li>
              <Link className={styles["nav-item"]} to="/2">
                Earrings
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/3">
                Necklaces
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/1">
                Bracelets
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/4">
                Rings
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles["search-box"]}>
          <div className={styles["search-container"]}>
            <span>
              <FontAwesomeIcon
                icon={faSearch}
                className={styles["icon-search"]}
              />
            </span>
            <form method="GET">
              <input
                //   value={query}
                //   onChange={onChange}
                type="text"
                className={styles["search-input"]}
                placeholder="Find a jewelry"
              />
            </form>
          </div>
        </div>
        <div className={styles["icon-box"]}>
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
                {wishListCountGreaterThanZero ? (
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
                <Link className={styles["icon-bar-item"]} to="/user/details">
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
      </div>
    </header>
  );
};
