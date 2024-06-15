import styles from "./SearchInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchInput = ({ popupClickHandler }) => {
  return (
    <div className={styles["search-box"]}>
      <div className={styles["search-container"]}>
        <span>
          <FontAwesomeIcon icon={faSearch} className={styles["icon-search"]} />
        </span>
        <div
          className={`${styles["search-input"]} ${styles["custom-placeholder"]}`}
          onClick={popupClickHandler}
        >
          Search
        </div>
      </div>
    </div>
  );
};
