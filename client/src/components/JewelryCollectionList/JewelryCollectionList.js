import { JewelryCollectionListItems } from "./JewelryCollectionListItems/JewelryCollectionListItems";
import { useEffect, useState } from "react";
import { jewelryCollectionServiceFactory } from "../../services/jewelryCollectionService";
import { useService } from "../../hooks/useService";
import { COLLECTIONS_BY_NAMES } from "../../constants/collections";
import { useLocation } from "react-router-dom";
import styles from "./JewelryCollectionList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useJewelryList } from "../../hooks/useJewelryList";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";

export const JewelryCollectionList = ({ collectionId }) => {
  // const [jewelries, setJewelries] = useState([]);
  // const jewelryCollectionService = useService(jewelryCollectionServiceFactory);
  // const location = useLocation();
  // const path = location.pathname;
  // const collectionTitle = path.substring(1);
  // const collectionId = COLLECTIONS_BY_NAMES[collectionTitle];

  // let [loading, setLoading] = useState(false);

  // const fetchData = async () => {
  //   try {
  //     const data = await jewelryCollectionService.findAll(collectionId);
  //     setJewelries(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [collectionId]);

  // const handleMouseEnter = (_id) => {
  //   setJewelries((state) =>
  //     state.map((j) =>
  //       j._id === _id ? { ...j, isHovered: true } : { ...j, isHovered: false }
  //     )
  //   );
  // };

  // const handleMouseLeave = (_id) => {
  //   setJewelries((state) =>
  //     state.map((j) => (j._id === _id ? { ...j, isHovered: false } : j))
  //   );
  // };

  // const handleLikedByUser = () => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     fetchData();
  //   }, 600);
  // };

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
  } = useJewelryList(jewelryCollectionServiceFactory, collectionId);

  useEffect(() => {
    setJewelries([]);
    setPage(0);
    fetchData(true);
  }, [collectionId]);

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
          <JewelryCollectionListItems
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


  // return (
    
  //   <section className={styles["jewelries-box"]}>
  //     <div className={styles["jewelries-container"]}>
  //       {jewelries.map((j) => (
  //         <JewelryCollectionListItems
  //           key={j._id}
  //           {...j}
  //           handleMouseEnter={handleMouseEnter}
  //           handleLikedByUser={handleLikedByUser}
  //           handleMouseLeave={handleMouseLeave}
  //         />
  //       ))}
  //     </div>
  //     {loading && <LoadingSpinner />}
  //   </section>
  // );
};
