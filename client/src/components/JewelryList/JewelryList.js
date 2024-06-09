import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import { useEffect, useState } from "react";
import { jewelryServiceFactory } from "../../services/jewelryService";
import { useService } from "../../hooks/useService";
import { CATEGORIES_BY_NAMES } from "../../constants/categories";
import { useLocation } from "react-router-dom";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";

export const JewelryList = ({ categoryId }) => {
  const [jewelries, setJewelries] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  // const location = useLocation();
  // const path = location.pathname;
  // const categoryTitle = path.substring(1);
  // const categoryId = CATEGORIES_BY_NAMES[categoryTitle];

  // const categoryId = CATEGORIES_BY_NAMES[category]
  const [page, setPage] = useState(0);

  let [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   jewelryService
  //     .getAll(categoryId)
  //     .then(setJewelries)
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, [categoryId]);

  const fetchData = async () => {
    const skip = page * ITEMS_PER_PAGE;
    const limit = ITEMS_PER_PAGE;

    try {
      const data = await jewelryService.findAll(categoryId, skip, limit);
      if (page === 0) {
        setJewelries(data);
      } else {
        setJewelries((prevItems) => [...prevItems, ...data]);
      }
      // setJewelries(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, page]);

  useEffect(() => {
    setPage(0);
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

  const handleLikedByUser = () => {
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 600);
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
      <LoadMoreButton handleLoadMore={handleLoadMore} />
      {loading && <LoadingSpinner />}
    </section>
  );
};
