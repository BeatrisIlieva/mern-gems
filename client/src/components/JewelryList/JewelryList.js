import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../Dropdown/Dropdown";

const SORT_BY_MENU_LABELS = {
  AvailableNow: "Available Now",
  ByLowToHigh: "Price: Low To High",
  ByHighToLow: "Price: High To Low",
};

const SORT_BY_MENU_SUB_LABEL = {
  SortBy: "Sort By:",
};

const MENU_LABELS = {
  Collection: "collection",
  StoneType: "stoneType",
  StoneColor: "stoneColor",
  AvailableNow: "Available Now",
};

const MENU_SUB_LABELS = {
  Collection: "collection",
  StoneType: "stoneType",
  StoneColor: "stoneColor",
};

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

  const [sortByAvailableNow, setSortByAvailableNow] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);

  useEffect(() => {
    setJewelries([]);
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);
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

  const clickSortByAvailableNowHandler = () => {
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);

    getSortedByAvailableNow();
  };

  const clickSortByLowToHighHandler = () => {
    setSortByAvailableNow(false);
    setSortByLowToHigh(true);
    setSortByHighToLow(false);

    getSortedByLowToHigh();
  };

  const clickSortByHighToLowHandler = () => {
    setSortByAvailableNow(false);
    setSortByLowToHigh(false);
    setSortByHighToLow(true);

    getSortedByHighToLow();
  };

  const getSortedByLowToHigh = () => {
    const sortedJewelries = [...jewelries].sort((a, b) => {
      return a.price - b.price;
    });

    setJewelries(sortedJewelries);
  };

  const getSortedByHighToLow = () => {
    const sortedJewelries = [...jewelries].sort((a, b) => {
      return b.price - a.price;
    });

    setJewelries(sortedJewelries);
  };

  const getSortedByAvailableNow = () => {
    const sortedJewelries = [...jewelries].sort((a, b) => {
      return a.isSoldOut - b.isSoldOut;
    });

    setJewelries(sortedJewelries);
  };

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
          <Dropdown
            label={SORT_BY_MENU_LABELS.AvailableNow}
            subLabel={SORT_BY_MENU_SUB_LABEL.SortBy}
          >
            <ul className={styles["sort-list"]} role="list">
              <li className={styles["filter-item"]}>
                <button
                  className={styles["filter-button"]}
                  onClick={clickSortByAvailableNowHandler}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByAvailableNow === true
                        ? styles["circle-selected"]
                        : ""
                    }`.trim()}
                  />
                  {SORT_BY_MENU_LABELS.AvailableNow}
                </button>
              </li>
              <li className={styles["filter-item"]}>
                <button
                  className={styles["filter-button"]}
                  onClick={clickSortByLowToHighHandler}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByLowToHigh === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  {SORT_BY_MENU_LABELS.ByLowToHigh}
                </button>
              </li>
              <li className={styles["filter-item"]}>
                <button
                  className={styles["filter-button"]}
                  onClick={clickSortByHighToLowHandler}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`${styles["circle"]} ${
                      sortByHighToLow === true ? styles["circle-selected"] : ""
                    }`.trim()}
                  />
                  {SORT_BY_MENU_LABELS.ByHighToLow}
                </button>
              </li>
            </ul>
          </Dropdown>
        </div>
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
