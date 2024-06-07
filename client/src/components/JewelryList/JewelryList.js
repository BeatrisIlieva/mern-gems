import { JewelryListItems } from "./JewelryListItems/JewelryListItems"
import { useEffect, useState } from "react";
import { jewelryServiceFactory } from "../../services/jewelryService";
import { useService } from "../../hooks/useService";
import { CATEGORIES_BY_NAMES } from "../../constants/categories";
import { useLocation } from 'react-router-dom';

export const JewelryList = () => {
  const [jewelries, setJewelries] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const location = useLocation();
  const path = location.pathname; // Get the current path, e.g., "/rings"
  const categoryTitle = path.substring(1);
  const categoryId = CATEGORIES_BY_NAMES[categoryTitle];


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
    <section>
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
