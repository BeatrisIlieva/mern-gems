import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBoxPopup.module.css";

export const SearchBoxPopup = ({ popupSubmitHandler, popupCloseHandler }) => {
  return (
    <section className={styles["popup-box"]}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <div className={styles["search-box"]}>
              <div className={styles["search-container"]}>
                <span>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={styles["icon-search"]}
                  />
                </span>
                <form method="GET" className={styles["form-container"]}>
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
            <div id={styles["xMark"]} onClick={() => popupCloseHandler()}>
              <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
            </div>
          </div>
          <button
            className={styles["dismiss-button"]}
            onClick={() => popupCloseHandler()}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};
