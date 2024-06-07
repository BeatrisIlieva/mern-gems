import { JewelryListItems } from "./JewelryListItems/JewelryListItems"
import { useEffect, useState } from "react";
import { jewelryServiceFactory } from "../../services/jewelryService";
import { useParams } from "react-router-dom";
import { useService } from "../../hooks/useService";
import { CATEGORIES_BY_NAMES } from "../../constants/categories";

export const JewelryList = () => {
  const { categoryName } = useParams();
  const [jewelries, setJewelries] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const categoryId = CATEGORIES_BY_NAMES[categoryName];

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
      const data = await jewelryService.getAll(categoryId);
      setJewelries(data);
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

  const handleLikedByUser = (_id) => {
    fetchData();
  };

  return (
    <section className={styles["jewelry-cards"]}>
      {jewelries.map((j) => (
        <JewelryListItems
          key={j._id}
          {...j}
          handleMouseEnter={handleMouseEnter}
          handleLikedByUser={handleLikedByUser}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
    </section>
  );
};
