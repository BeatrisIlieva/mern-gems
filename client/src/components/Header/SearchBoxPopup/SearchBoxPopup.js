import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBoxPopup.module.css";
import { useState, useEffect } from "react";
import { searchServiceFactory } from "../../../services/searchService";
import { useService } from "../../../hooks/useService";
import { JewelryListItems } from "../../JewelryList/JewelryListItems/JewelryListItems";
import { Link } from "react-router-dom";

export const SearchBoxPopup = ({ popupSubmitHandler, popupCloseHandler }) => {
  const [query, setQuery] = useState(null);
  const [jewelries, setJewelries] = useState([]);
  const searchService = useService(searchServiceFactory);

  console.log(query);

  const onChange = async (e) => {
    setQuery(e.target.value);
    console.log(query);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // navigate("/search", { state: { query: query } });
  };

  useEffect(() => {
    searchService
      .findAll(query)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [query]);

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
                    value={query}
                    onChange={onChange}
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
          {jewelries.length > 0 ? (
            <div className={styles["search-results"]}>
              {jewelries.map((j) => (
                <div key={j._id}>
                  <img src={j.firstImageUrl} alt="" />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles["collections-container"]}>
              <Link to="/forget-me-not" className={styles["no-decoration"]}>
                <h2
                  className={styles["collection-title"]}
                  data-testid="forget-me-not-title"
                >
                  Forget-Me-Not Collection
                </h2>
              </Link>
              <Link to="/classics" className={styles["no-decoration"]}>
                <h2
                  className={styles["collection-title"]}
                  data-testid="classics-title"
                >
                  Classics Collection
                </h2>
              </Link>
              <Link to="/pirouette" className={styles["no-decoration"]}>
                <h2
                  className={styles["collection-title"]}
                  data-testid="pirouette-title"
                >
                  Pirouette Collection
                </h2>
              </Link>
            </div>
          )}
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
