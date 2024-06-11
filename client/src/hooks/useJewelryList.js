import { useState } from "react";
import { useService } from "../hooks/useService";
import { ITEMS_PER_PAGE } from "../constants/pagination";
import { CATEGORIES_BY_IDS } from "../constants/categories";

export const useJewelryList = (fetchDataFunction, id = null) => {
  const [jewelries, setJewelries] = useState([]);
  const serviceFactory = useService(fetchDataFunction);
  let [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const categoryName = CATEGORIES_BY_IDS[id];

  const [loadMoreDisabled, setLoadMoreDisabled] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const { data, totalCount } = await serviceFactory.findAll(id);

        setJewelries(data);
        setTotalCount(totalCount);
        setLoadMoreDisabled(totalCount <= ITEMS_PER_PAGE);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const mouseEnterHandler = (_id) => {
    setJewelries((state) =>
      state.map((j) =>
        j._id === _id ? { ...j, isHovered: true } : { ...j, isHovered: false }
      )
    );
  };

  const mouseLeaveHandler = (_id) => {
    setJewelries((state) =>
      state.map((j) => (j._id === _id ? { ...j, isHovered: false } : j))
    );
  };

  return {
    setJewelries,
    jewelries,
    loading,
    mouseEnterHandler,
    mouseLeaveHandler,
    fetchData,
    totalCount,
    loadMoreDisabled,
    setLoadMoreDisabled,
    categoryName,
  };
};
