import { JewelryCollectionListItems } from "./JewelryCollectionListItems/JewelryCollectionListItems";
import { useEffect } from "react";
import { jewelryCollectionServiceFactory } from "../../services/jewelryCollectionService";
import styles from "./JewelryCollectionList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useJewelryList } from "../../hooks/useJewelryList";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";

export const JewelryCollectionList = ({ collectionId }) => {
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
    setLoading,
  } = useJewelryList(jewelryCollectionServiceFactory, collectionId);

  useEffect(() => {
    setJewelries([]);
    setPage(0);
    fetchData(true);
  }, [collectionId]);

  const handleLikedByUser = (id) => {
    setLoading(true);
    setJewelries((prevJewelries) =>
      prevJewelries.map((jewelry) =>
        jewelry._id === id
          ? { ...jewelry, isLikedByUser: !jewelry.isLikedByUser }
          : jewelry
      )
    );
    setTimeout(() => {
      fetchData();
    }, 600);
  };

  // const handleLikedByUser = (id) => {
  //   setJewelries((prevJewelries) =>
  //     prevJewelries.map((jewelry) =>
  //       jewelry._id === id
  //         ? { ...jewelry, isLikedByUser: !jewelry.isLikedByUser }
  //         : jewelry
  //     )
  //   );
  //   fetchData();
  // };

  return (
    <section className={styles["jewelries-box"]}>
      <div className={styles["jewelries-container"]}>
        {jewelries.map((j) => (
          <JewelryCollectionListItems
            key={j._id}
            {...j}
            handleMouseEnter={handleMouseEnter}
            handleLikedByUser={handleLikedByUser}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles["load-more-button"]}>
          <LoadMoreButton
            handleLoadMore={handleLoadMore}
            loadMoreDisabled={loadMoreDisabled}
          />
        </div>
      )}
    </section>
  );
};
