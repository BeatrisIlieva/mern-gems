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
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import { VerticalLine } from "../VerticalLine/VerticalLine";

const SORT_BY_MENU_LABELS = {
  AvailableNow: "Available Now",
  ByLowToHigh: "Price Low To High",
  ByHighToLow: "Price High To Low",
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
    loading,
    mouseEnterHandler,
    mouseLeaveHandler,
    fetchData,
    totalCount,
    loadMoreDisabled,
    setLoadMoreDisabled,
    categoryName,
  } = useJewelryList(serviceFactory, entityId);

  const [sortByAvailableNow, setSortByAvailableNow] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);
  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);

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

  const loadMoreHandler = () => {
    const nextPage = page + 1;
    if (nextPage * ITEMS_PER_PAGE >= totalCount) {
      setLoadMoreDisabled(true);
    }
    setPage(nextPage);

    const newDisplayedItems = displayedItems + ITEMS_PER_PAGE;
    if (newDisplayedItems >= totalCount) {
      setLoadMoreDisabled(true);
    }
    setDisplayedItems(newDisplayedItems);
  };

  useEffect(() => {
    setJewelries([]);
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);
    setPage(0);
    setLoadMoreDisabled(false);
    setDisplayedItems(ITEMS_PER_PAGE);
    fetchData();
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

  const getSortLabel = () => {
    if (sortByAvailableNow) {
      return SORT_BY_MENU_LABELS.AvailableNow;
    } else if (sortByLowToHigh) {
      return SORT_BY_MENU_LABELS.ByLowToHigh;
    } else if (sortByHighToLow) {
      return SORT_BY_MENU_LABELS.ByHighToLow;
    }
    return SORT_BY_MENU_LABELS.AvailableNow;
  };

  const displayedJewelries = jewelries.slice(0, displayedItems);

  return (
    <section>
      {categoryName === "Earrings" && (
        <>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718118512/ReactGems/common_img/largeherod_l2_hj_incre_heartshape_ea_main_rjzvzb.avif"
              }
              alt={"Img"}
            />
          </div>
          <h2 className={styles["box-title"]}>{categoryName}</h2>
          <VerticalLine />
          <div className={styles["paragraph-container"]}>
            <p className={styles["box-paragraph"]}>
              From floral fine jewelry styles to bold designs, to classic
              earstuds, chandeliers and diamond drops, explore React Gems'
              selection of diamond earrings.
            </p>
          </div>
        </>
      )}
      {categoryName === "Rings" && (
        <>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718123003/ReactGems/common_img/largeherod_l2_hj_hope_2_main_ahryjw.avif"
              }
              alt={"Img"}
            />
          </div>
          <h2 className={styles["box-title"]}>{categoryName}</h2>
          <VerticalLine />
          <div className={styles["paragraph-container"]}>
            <p className={styles["box-paragraph"]}>
              React Gems' rings feature the most exceptional diamonds and
              gemstones and are known for their unequivocal beauty.
            </p>
          </div>
        </>
      )}
      {categoryName === "Necklaces & Pendants" && (
        <>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718123000/ReactGems/common_img/herolarged_incredibles_yellow_1_w7m1st.avif"
              }
              alt={"Img"}
            />
          </div>
          <h2 className={styles["box-title"]}>{categoryName}</h2>
          <VerticalLine />
          <div className={styles["paragraph-container"]}>
            <p className={styles["box-paragraph"]}>
              React Gems's precious gemstones necklaces and pendants, set in
              platinum, offer a more delicate interpretation of the House's
              signature fine jewelry aesthetic.
            </p>
          </div>
        </>
      )}
      {categoryName === "Bracelets" && (
        <>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718122429/ReactGems/common_img/Screenshot_2024-06-11_at_19.12.51_ndmrz2.png"
              }
              alt={"Img"}
            />
          </div>
          <h2 className={styles["box-title"]}>{categoryName}</h2>
          <VerticalLine />
          <div className={styles["paragraph-container"]}>
            <p className={styles["box-paragraph"]}>
              From sparkling diamond bracelets to chic diamond bangles, explore
              the brilliant designs from the House of React Gems'.
            </p>
          </div>
        </>
      )}
      <div className={styles["jewelries-box"]}>
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
              <div className={styles["form-vertical-line"]}></div>
              <li className={styles["filter-item"]}>
                <button className={styles["filter-button"]}>
                  Stone Type{" "}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles["heart"]}
                  />
                </button>
              </li>
              <div className={styles["form-vertical-line"]}></div>
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
              label={getSortLabel()}
              subLabel={SORT_BY_MENU_SUB_LABEL.SortBy}
            >
              <ul className={styles["sort-list"]} role="list">
                <li className={styles["filter-item"]}>
                  <button
                    className={styles["filter-button"]}
                    onClick={() => clickSortByAvailableNowHandler()}
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
                    onClick={() => clickSortByLowToHighHandler()}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={`${styles["circle"]} ${
                        sortByLowToHigh === true
                          ? styles["circle-selected"]
                          : ""
                      }`.trim()}
                    />
                    {SORT_BY_MENU_LABELS.ByLowToHigh}
                  </button>
                </li>
                <li className={styles["filter-item"]}>
                  <button
                    className={styles["filter-button"]}
                    onClick={() => clickSortByHighToLowHandler()}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={`${styles["circle"]} ${
                        sortByHighToLow === true
                          ? styles["circle-selected"]
                          : ""
                      }`.trim()}
                    />
                    {SORT_BY_MENU_LABELS.ByHighToLow}
                  </button>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
        <div className={styles["jewelries-count"]}>
          Showing 1 -{" "}
          {totalCount >= displayedItems ? displayedItems : totalCount} 0f{" "}
          {totalCount}
        </div>
        <div className={styles["jewelries-container"]}>
          {displayedJewelries.map((j) => (
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
      </div>
    </section>
  );
};
