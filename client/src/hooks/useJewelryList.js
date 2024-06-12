import { useState, useEffect } from "react";
import { useService } from "../hooks/useService";
import { ITEMS_PER_PAGE } from "../constants/pagination";

export const useJewelryList = (fetchDataFunction, entityId = null) => {
  const [jewelries, setJewelries] = useState([]);
  const [filteredJewelries, setFilteredJewelries] = useState([]);
  const serviceFactory = useService(fetchDataFunction);
  let [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(filteredJewelries.length);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(
    filteredJewelries.length <= ITEMS_PER_PAGE
  );
  const [stoneTypesData, setStoneTypesData] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const { data, totalCount, stoneTypesData } =
          await serviceFactory.findAll(entityId);

        setJewelries(data);
        setFilteredJewelries(data);
        // setTotalCount(totalCount);
        setStoneTypesData(stoneTypesData);
        setLoadMoreDisabled(totalCount <= ITEMS_PER_PAGE);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const mouseEnterHandler = (_id) => {
    setFilteredJewelries((state) =>
      state.map((j) =>
        j._id === _id ? { ...j, isHovered: true } : { ...j, isHovered: false }
      )
    );
  };

  const mouseLeaveHandler = (_id) => {
    setFilteredJewelries((state) =>
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
    stoneTypesData,
    setFilteredJewelries,
    filteredJewelries,
    setTotalCount,
  };
};
