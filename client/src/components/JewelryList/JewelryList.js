import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import { useEffect, useState } from "react";
import { jewelryServiceFactory } from "../../services/jewelryService";
import { useService } from "../../hooks/useService";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";

export const JewelryList = ({ categoryId }) => {
  const [jewelries, setJewelries] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  let [loading, setLoading] = useState(true);



  const fetchData = async (isInitialFetch = false) => {
    setLoading(true);
    const skip = isInitialFetch ? 0 : page * ITEMS_PER_PAGE;
    // const skip = page * ITEMS_PER_PAGE;
    const limit = ITEMS_PER_PAGE;

    try {
      const { data, totalCount } = await jewelryService.findAll(
        categoryId,
        skip,
        limit
      );
      setTotalCount(totalCount);
      // const data = await jewelryService.findAll(categoryId, skip, limit);
      setJewelries((prevItems) => {
        const updatedItems = [...prevItems];

        data.forEach((newItem) => {
          const existingIndex = updatedItems.findIndex(
            (item) => item._id === newItem._id
          );
          if (existingIndex === -1) {
            // If item does not exist, add it
            updatedItems.push(newItem);
          } else {
            // If item exists, update it
            updatedItems[existingIndex] = newItem;
          }
        });

        return updatedItems;
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setJewelries([]);
    setPage(0);
    fetchData(true);
  }, [categoryId]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleMouseEnter = (_id) => {
    setJewelries((state) =>
      state.map((j) =>
        j._id === _id ? { ...j, isHovered: true } : { ...j, isHovered: false }
      )
    );
  };

  const handleMouseLeave = (_id) => {
    setJewelries((state) =>
      state.map((j) => (j._id === _id ? { ...j, isHovered: false } : j))
    );
  };

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

  // const handleLikedByUser = (_id) => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setJewelries((prevJewelries) =>
  //       prevJewelries.map((jewelry) =>
  //         jewelry._id === _id ? { ...jewelry, isLikedByUser: prevJewelries.isLikedByUser } : jewelry
  //       )
  //     );
  //     // fetchData();
  //   }, 600);
  // };

  return (
    <section className={styles["jewelries-box"]}>
      <div className={styles["jewelries-container"]}>
        {jewelries.map((j) => (
          <JewelryListItems
            key={j._id}
            {...j}
            handleMouseEnter={handleMouseEnter}
            handleLikedByUser={handleLikedByUser}
            setJewelries={setJewelries}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className={styles["load-more-button"]}>
        {jewelries.length < totalCount && (
          <LoadMoreButton handleLoadMore={handleLoadMore} />
        )}
      </div>
      {/* <div className={styles["load-more-button"]}>
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      </div> */}
      {loading && <LoadingSpinner />}
    </section>
  );
};
