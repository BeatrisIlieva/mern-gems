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
import { DynamicDropdown } from "../DynamicDropdown/DynamicDropdown";

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

export const JewelryList = ({ entityId, entityTitle, serviceFactory }) => {
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
    stoneTypesData,
    stoneColorsData,
    setFilteredJewelries,
    filteredJewelries,
    setTotalCount,
    fetchStonesCountData
    // fetchStoneTypesData,
    // fetchStoneColorsData,
  } = useJewelryList(serviceFactory, entityId);

  const [sortByAvailableNow, setSortByAvailableNow] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);
  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [selection, setSelection] = useState({});

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
    const sortedJewelries = [...filteredJewelries].sort((a, b) => {
      return a.price - b.price;
    });

    setFilteredJewelries(sortedJewelries);
  };

  const getSortedByHighToLow = () => {
    const sortedJewelries = [...filteredJewelries].sort((a, b) => {
      return b.price - a.price;
    });

    setFilteredJewelries(sortedJewelries);
  };

  const getSortedByAvailableNow = () => {
    const sortedJewelries = [...filteredJewelries].sort((a, b) => {
      return a.isSoldOut - b.isSoldOut;
    });

    setFilteredJewelries(sortedJewelries);
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
    setSelection({})
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);
    setPage(0);
    setLoadMoreDisabled(false);
    setDisplayedItems(ITEMS_PER_PAGE);
    fetchData();
  }, [entityId]);



  const toggleLike = (jewelryId) => {
    setJewelries((prevJewelries) => {
      return prevJewelries.map((jewelry) => {
        if (jewelry._id === jewelryId) {
          return { ...jewelry, isLikedByUser: !jewelry.isLikedByUser };
        }
        return jewelry;
      });
    });

    setFilteredJewelries((prevFilteredJewelries) => {
      return prevFilteredJewelries.map((jewelry) => {
        if (jewelry._id === jewelryId) {
          return { ...jewelry, isLikedByUser: !jewelry.isLikedByUser };
        }
        return jewelry;
      });
    });
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

  const changeHandler = (e, entityTitle) => {
    const selected = e.target.value;
    const isChecked = e.target.checked;

    setSelection((state) => {
      if (isChecked) {
        return {
          ...state,
          [entityTitle]: [...(state[entityTitle] || []), Number(selected)],
        };
      } else {
        return {
          ...state,
          [entityTitle]: (state[entityTitle] || []).filter(
            (value) => value !== Number(selected)
          ),
        };
      }
    });
  };



  const stoneTypeSubmitHandler = (e) => {
    e.preventDefault();

    const filtered = getFilteredByStoneType();



    const serializedObject = getSerializedObject(filtered);


    fetchStonesCountData(serializedObject);


    updateState(filtered);
  };

  const getSerializedObject = (filtered) => {
    const jewelryIds = filtered.map((jewelry) => jewelry._id);
    const dynamicObject = { JewelryIds: jewelryIds };

    const serializedObject = JSON.stringify(dynamicObject);

    return serializedObject;
  }

  const updateState = (filtered) => {
    setFilteredJewelries(filtered);
    setTotalCount(filtered.length);
    setLoadMoreDisabled(filtered.length <= ITEMS_PER_PAGE);
  }

  const stoneColorSubmitHandler = (e) => {
    e.preventDefault();

    const filtered = getFilteredByStoneColor();

    const serializedObject = getSerializedObject(filtered);

    // const jewelryIds = filtered.map((jewelry) => jewelry._id);
    // const dynamicObject = { JewelryIds: jewelryIds };

    // const serializedObject = JSON.stringify(dynamicObject);

    fetchStonesCountData(serializedObject);

    updateState(filtered);

    // setFilteredJewelries(filtered);
    // setTotalCount(filtered.length);
    // setLoadMoreDisabled(filtered.length <= ITEMS_PER_PAGE);
  };

  const getFilteredByStoneType = () => {
    const filtered = filteredJewelries.filter((jewelry) => {
      const flattenedStoneTypes = jewelry.stoneTypeIds.flat();

      return flattenedStoneTypes.some((id) => selection.stoneType.includes(id));
    });
    return filtered;
  };

  const getFilteredByStoneColor = () => {
    const filtered = filteredJewelries.filter((jewelry) => {
      const flattenedStoneColors = jewelry.stoneColorIds.flat();

      return flattenedStoneColors.some((id) =>
        selection.stoneColor.includes(id)
      );
    });
    return filtered;
  };

  const displayedJewelries = filteredJewelries.slice(0, displayedItems);

  return (
    <section>
      {entityTitle === "Earrings" && (
        <div className={styles["hero-top-container"]}>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718118512/ReactGems/common_img/largeherod_l2_hj_incre_heartshape_ea_main_rjzvzb.avif"
              }
              alt={"Img"}
            />
          </div>
          <div className={styles["info-container"]}>
            <h2 className={styles["box-title"]}>{entityTitle}</h2>
            <VerticalLine />
            <div className={styles["paragraph-container"]}>
              <p className={styles["box-paragraph"]}>
                From floral fine jewelry styles to bold designs, to classic
                earstuds, chandeliers and diamond drops, explore React Gems'
                selection of diamond earrings.
              </p>
            </div>
          </div>
        </div>
      )}
      {entityTitle === "Rings" && (
        <div className={styles["hero-top-container"]}>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718123003/ReactGems/common_img/largeherod_l2_hj_hope_2_main_ahryjw.avif"
              }
              alt={"Img"}
            />
          </div>
          <div className={styles["info-container"]}>
            <h2 className={styles["box-title"]}>{entityTitle}</h2>
            <VerticalLine />
            <div className={styles["paragraph-container"]}>
              <p className={styles["box-paragraph"]}>
                React Gems' rings feature the most exceptional diamonds and
                gemstones and are known for their unequivocal beauty.
              </p>
            </div>
          </div>
        </div>
      )}
      {entityTitle === "Necklaces & Pendants" && (
        <div className={styles["hero-top-container"]}>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718123000/ReactGems/common_img/herolarged_incredibles_yellow_1_w7m1st.avif"
              }
              alt={"Img"}
            />
          </div>
          <div className={styles["info-container"]}>
            <h2 className={styles["box-title"]}>{entityTitle}</h2>
            <VerticalLine />
            <div className={styles["paragraph-container"]}>
              <p className={styles["box-paragraph"]}>
                React Gems's precious gemstones necklaces and pendants, set in
                platinum, offer a more delicate interpretation of the House's
                signature fine jewelry aesthetic.
              </p>
            </div>
          </div>
        </div>
      )}
      {entityTitle === "Bracelets" && (
        <div className={styles["hero-top-container"]}>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1718125861/ReactGems/common_img/Screenshot_2024-06-11_at_20.09.57_cc9fga.png"
              }
              alt={"Img"}
            />
          </div>
          <div className={styles["info-container"]}>
            <h2 className={styles["box-title"]}>{entityTitle}</h2>
            <VerticalLine />
            <div className={styles["paragraph-container"]}>
              <p className={styles["box-paragraph"]}>
                From sparkling diamond bracelets to chic diamond bangles,
                explore the brilliant designs from the House of React Gems'.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={styles["jewelries-box"]}>
        <div className={styles["jewelries-nav"]}>
          <div className={styles["filter-by-container"]}>
            <div>Filter By:</div>
            <ul className={styles["filter-list"]} role="list">
              {/* <li className={styles["filter-item"]}>
                <DynamicDropdown
                  label="Collection"
                  options={stoneTypesData}
                  changeHandler={changeHandler}
                  submitHandler={submitHandler}
                  selection={selection}
                />
              </li> */}
              <div className={styles["form-vertical-line"]}></div>
              <li className={styles["filter-item"]}>
                <DynamicDropdown
                  label="Stone Type"
                  options={stoneTypesData}
                  changeHandler={changeHandler}
                  submitHandler={stoneTypeSubmitHandler}
                  selection={selection}
                />
              </li>
              <div className={styles["form-vertical-line"]}></div>
              <li className={styles["filter-item"]}>
                <DynamicDropdown
                  label="Stone Color"
                  options={stoneColorsData}
                  changeHandler={changeHandler}
                  submitHandler={stoneColorSubmitHandler}
                  selection={selection}
                />
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
              toggleLike={toggleLike}
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
