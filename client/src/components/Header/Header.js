import styles from "./Header.module.css";
// import formStyles from "../../commonCSS/forms.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const wishListCountGreaterThanZero = true;
  const bagCountGreaterThanZero = true;
  const {isAuthenticated} = useAuthContext();
  const wishlistCount = 1;
  const bagCount = 3;
  const user = null;

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
        <nav>
          <ul className={styles["nav-list"]} role="list">
            <li>
              <Link className={styles["nav-item"]} to="/2">
                <h1 className={styles["nav-title"]}>Earrings</h1>
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/3">
                <h1 className={styles["nav-title"]}>Necklaces</h1>
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/1">
                <h1 className={styles["nav-title"]}>Bracelets</h1>
              </Link>
            </li>
            <li>
              <Link className={styles["nav-item"]} to="/4">
                <h1 className={styles["nav-title"]}>Rings</h1>
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
                className={`${styles["search-input"]} ${styles["custom-placeholder"]}`}
                placeholder="Search"
              />
            </form>
          </div>
        </div>
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
    </header>
  );
};
