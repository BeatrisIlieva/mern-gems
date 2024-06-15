import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import { VerticalLine } from "../VerticalLine/VerticalLine";
import { SortBy } from "../SortBy/SortBy";
import { FilterBy } from "../FilterBy/FilterBy";


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



  useEffect(() => {
    setJewelries([]);
    setSelection({});
    setPage(0);
    setLoadMoreDisabled(false);
    setDisplayedItems(ITEMS_PER_PAGE);
    fetchData();
  }, [entityId, entityTitle]);



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
          <FilterBy
            stoneTypesData={stoneTypesData}
            stoneColorsData={stoneColorsData}
            setFilteredJewelries={setFilteredJewelries}
            filteredJewelries={filteredJewelries}
            setTotalCount={setTotalCount}
            setLoadMoreDisabled={setLoadMoreDisabled}
            jewelries={jewelries}
            fetchStonesCountData={fetchStonesCountData}
            setSelection={setSelection}
            selection={selection}
            itemsPerPage={ITEMS_PER_PAGE}
          />
          <SortBy
            entityId={entityId}
            entityTitle={entityTitle}
            filteredJewelries={filteredJewelries}
            setFilteredJewelries={setFilteredJewelries}
          />
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
