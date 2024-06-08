import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import { useEffect, useState } from "react";
import { jewelryServiceFactory } from "../../services/jewelryService";
import { useService } from "../../hooks/useService";
import { CATEGORIES_BY_NAMES } from "../../constants/categories";
import { useLocation } from "react-router-dom";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const JewelryList = () => {
  const [jewelries, setJewelries] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const location = useLocation();
  const path = location.pathname;
  const categoryTitle = path.substring(1);
  const categoryId = CATEGORIES_BY_NAMES[categoryTitle];

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
    try {
      const data = await jewelryService.findAll(categoryId);
      setJewelries(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

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
      {loading && <LoadingSpinner />}
    </section>
  );
};
