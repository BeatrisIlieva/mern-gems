import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import { VerticalLine } from "../VerticalLine/VerticalLine";
import { DynamicDropdown } from "../DynamicDropdown/DynamicDropdown";
import { getSerializedObject } from "../../utils/getSerializedObject";
import { getFilteredByStoneType } from "../../utils/getFilteredByStoneType";
import { getFilteredByStoneColor } from "../../utils/getFilteredByStoneColor";
import { SortBy } from "../SortBy/SortBy";

const FILTER_BY_MENU_LABELS = {
  StoneType: { label: "Stone Type", selectionKey: "stoneType" },
  StoneColor: { label: "Stone Color", selectionKey: "stoneColor" },
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
    fetchStonesCountData,
  } = useJewelryList(serviceFactory, entityId);

  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [selection, setSelection] = useState({});
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isSelectedStoneType, setIsSelectedStoneType] = useState(false);
  const [isSelectedStoneColor, setIsSelectedStoneColor] = useState(false);



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

  // const getSortLabel = () => {
  //   if (sortByAvailableNow) {
  //     return SORT_BY_MENU_LABELS.AvailableNow;
  //   } else if (sortByLowToHigh) {
  //     return SORT_BY_MENU_LABELS.ByLowToHigh;
  //   } else if (sortByHighToLow) {
  //     return SORT_BY_MENU_LABELS.ByHighToLow;
  //   }
  //   return SORT_BY_MENU_LABELS.AvailableNow;
  // };

  const updateSelection = (selectionKey) => {
    setSelection((prevState) => {
      const newState = {
        ...prevState,
        [selectionKey]: [],
      };

      return newState;
    });
  };

  const clearFilter = (selectionKey) => {
    updateSelection(selectionKey);

    let filtered;

    if (
      selectionKey === FILTER_BY_MENU_LABELS.StoneType.selectionKey &&
      selection[FILTER_BY_MENU_LABELS.StoneColor.selectionKey]?.length > 0
    ) {
      filtered = getFilteredByStoneColor(jewelries, selection);
    } else if (
      selectionKey === FILTER_BY_MENU_LABELS.StoneColor.selectionKey &&
      selection[FILTER_BY_MENU_LABELS.StoneType.selectionKey]?.length > 0
    ) {
      filtered = getFilteredByStoneType(jewelries, selection);
    } else {
      filtered = jewelries;
    }

    const serializedObject = getSerializedObject(filtered);

    fetchStonesCountData(serializedObject);

    updateState(filtered);
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

  const submitHandler = (e, selectionKey) => {
    e.preventDefault();

    let filtered;

    if (selectionKey === FILTER_BY_MENU_LABELS.StoneType.selectionKey) {
      filtered = getFilteredByStoneType(filteredJewelries, selection);
    } else if (selectionKey === FILTER_BY_MENU_LABELS.StoneColor.selectionKey) {
      filtered = getFilteredByStoneColor(filteredJewelries, selection);
    } else {
      filtered = jewelries;
    }

    const serializedObject = getSerializedObject(filtered);

    fetchStonesCountData(serializedObject);

    updateState(filtered);
  };

  const updateState = (filtered) => {
    setFilteredJewelries(filtered);

    setTotalCount(filtered.length);

    setLoadMoreDisabled(filtered.length <= ITEMS_PER_PAGE);
  };

  const toggleSelectedStoneType = () => {
    const isEmpty = selection.stoneType?.length > 0;

    setIsSelectedStoneType(isEmpty);
  };

  const toggleSelectedStoneColor = () => {
    const isEmpty = selection.stoneColor?.length > 0;

    setIsSelectedStoneColor(isEmpty);
  };

  useEffect(() => {
    setJewelries([]);
    setSelection({});
    // setSortByAvailableNow(true);
    // setSortByLowToHigh(false);
    // setSortByHighToLow(false);
    setPage(0);
    setLoadMoreDisabled(false);
    setDisplayedItems(ITEMS_PER_PAGE);
    fetchData();
  }, [entityId, entityTitle]);

  useEffect(() => {
    toggleSelectedStoneType();
    toggleSelectedStoneColor();
  }, [selection]);

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
              <li className={styles["filter-item"]}>
                <DynamicDropdown
                  label={FILTER_BY_MENU_LABELS.StoneType.label}
                  options={stoneTypesData}
                  changeHandler={changeHandler}
                  submitHandler={submitHandler}
                  selection={selection}
                  clearFilter={clearFilter}
                  selectionKey={FILTER_BY_MENU_LABELS.StoneType.selectionKey}
                  onDropdownToggle={(isOpen) => setDropdownIsOpen(isOpen)}
                  isSelected={isSelectedStoneType}
                />
              </li>
              <div className={styles["form-vertical-line"]}></div>
              <li className={styles["filter-item"]}>
                <DynamicDropdown
                  label={FILTER_BY_MENU_LABELS.StoneColor.label}
                  options={stoneColorsData}
                  changeHandler={changeHandler}
                  submitHandler={submitHandler}
                  selection={selection}
                  clearFilter={clearFilter}
                  selectionKey={FILTER_BY_MENU_LABELS.StoneColor.selectionKey}
                  onDropdownToggle={(isOpen) => setDropdownIsOpen(isOpen)}
                  isSelected={isSelectedStoneColor}
                />
              </li>
            </ul>
          </div>
          <SortBy entityId={entityId} entityTitle={entityTitle} filteredJewelries={filteredJewelries} setFilteredJewelries={setFilteredJewelries}/>
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
