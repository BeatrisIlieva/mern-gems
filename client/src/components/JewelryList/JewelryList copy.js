import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState, useRef  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const MENU_OPTIONS = {
  Collection: "collection",
  StoneType: "stoneType",
  StoneColor: "stoneColor",
  NewToReactGems: "newToReactGems",
};

const SORT_BY_OPTIONS = {
  LowToHigh: "lowToHigh",
  HighToLow: "highToLow",
  NewToReactGems: "newToReactGems",
};

// const SERVICES_BY_OPTIONS = {

// }

export const JewelryList = ({ entityId, serviceFactory }) => {
  const {
    setJewelries,
    jewelries,
    loadMoreDisabled,
    loading,
    loadMoreHandler,
    mouseEnterHandler,
    mouseLeaveHandler,
    fetchData,
    setPage,
  } = useJewelryList(serviceFactory, entityId);

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowSortByMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [selectedMenu, setSelectedMenu] = useState([]);

  const [showSortByMenu, setShowSortByMenu] = useState(false);

  const [sortByNewToReactGems, setSortByNewToReactGems] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);

  useEffect(() => {
    setJewelries([]);
    setPage(0);
    fetchData(true);
  }, [entityId]);

  const handleLikedByUser = (id) => {
    setJewelries((prevJewelries) =>
      prevJewelries.map((jewelry) =>
        jewelry._id === id
          ? { ...jewelry, isLikedByUser: !jewelry.isLikedByUser }
          : jewelry
      )
    );
    fetchData();
  };



  const clickSortByMenuHandler = () => {};

  const blurSortByMenuHandler = () => {};

  const clickSortByNewToReactGemsHandler = () => {};

  const clickSortByLowToHighHandler = () => {};

  const clickSortByHighToLowHandler = () => {};

  return (
    <section className={styles["jewelries-box"]}>
      <div className={styles["jewelries-nav"]}>
        <div className={styles["filter-by-container"]}>
          <div>Filter By:</div>
          <ul className={styles["filter-list"]} role="list">
            <li className={styles["filter-item"]}>
              <button className={styles["filter-button"]}>
                Collection{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles["heart"]}
                />
              </button>
            </li>
            <li className={styles["filter-item"]}>
              <button className={styles["filter-button"]}>
                Stone Type{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles["heart"]}
                />
              </button>
            </li>
            <li className={styles["filter-item"]}>
              <button className={styles["filter-button"]}>
                Stone Color{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles["heart"]}
                />
              </button>
            </li>
          </ul>
        </div>
        <div className={styles["sort-by-container"]}>
          <div>Sort By:</div>
          <div
            onClick={() => setSelectedMenu(MENU_OPTIONS.NewToReactGems)}
            ref={menuRef}
            onBlur={() => setSelectedMenu(null)}
          >
            New to React Gems{" "}
            <FontAwesomeIcon icon={faChevronDown} className={styles["heart"]} />
          </div>
          {selectedMenu === MENU_OPTIONS.NewToReactGems && (
            <ul className={styles["sort-list"]} role="list">
              <li className={styles["filter-item"]}>
                <button className={styles["filter-button"]}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByNewToReactGems === true
                        ? styles["circle-selected"]
                        : ""
                    }`.trim()}
                  />
                  New to React Gems
                </button>
              </li>
              <li className={styles["filter-item"]}>
                <button className={styles["filter-button"]}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByLowToHigh === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  Price: Low To High
                </button>
              </li>
              <li className={styles["filter-item"]}>
                <button className={styles["filter-button"]}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByHighToLow === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  Price: High To Low
                </button>
              </li>
            </ul>
          )}
        </div>
        {/* </div> */}
      </div>
      <div className={styles["jewelries-container"]}>
        {jewelries.map((j) => (
          <JewelryListItems
            key={j._id}
            {...j}
            mouseEnterHandler={mouseEnterHandler}
            handleLikedByUser={handleLikedByUser}
            mouseLeaveHandler={mouseLeaveHandler}
          />
        ))}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles["load-more-button"]}>
          <LoadMoreButton
            loadMoreHandler={loadMoreHandler}
            loadMoreDisabled={loadMoreDisabled}
          />
        </div>
      )}
    </section>
  );
};
