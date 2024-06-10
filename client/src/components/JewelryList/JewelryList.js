import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import { jewelryServiceFactory } from "../../services/jewelryService";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect } from "react";

export const JewelryList = ({ categoryId }) => {
  const {
    setJewelries,
    jewelries,
    loadMoreDisabled,
    loading,
    handleLoadMore,
    handleMouseEnter,
    handleMouseLeave,
    fetchData,
    setPage,
  } = useJewelryList(jewelryServiceFactory, categoryId);

  useEffect(() => {
    setJewelries([]);
    setPage(0);
    fetchData(true);
  }, [categoryId]);

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

  return (
    <section className={styles["jewelries-box"]}>
      <div className={styles["jewelries-container"]}>
        {jewelries.map((j) => (
          <JewelryListItems
            key={j._id}
            {...j}
            handleMouseEnter={handleMouseEnter}
            handleLikedByUser={handleLikedByUser}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className={styles["load-more-button"]}>
        <LoadMoreButton
          handleLoadMore={handleLoadMore}
          loadMoreDisabled={loadMoreDisabled}
        />
      </div>
      {loading && <LoadingSpinner />}
    </section>
  );
};
