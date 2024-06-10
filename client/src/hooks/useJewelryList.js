import { useEffect, useState } from "react";
import { useService } from "../hooks/useService";
import { ITEMS_PER_PAGE } from "../constants/pagination";

export const useJewelryList = (fetchDataFunction, id = null) => {
  const [jewelries, setJewelries] = useState([]);
  const serviceFactory = useService(fetchDataFunction);
  const [page, setPage] = useState(0);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);

  let [loading, setLoading] = useState(true);

  const fetchData = async (isInitialFetch = false) => {
    setLoading(true);

    const skip = isInitialFetch ? 0 : page * ITEMS_PER_PAGE;

    const limit = ITEMS_PER_PAGE;

    try {
      const { data, totalCount } = await serviceFactory.findAll(
        id,
        skip,
        limit
      );

      setJewelries((prevItems) => {
        const updatedItems = [...prevItems];

        data.forEach((newItem) => {
          const existingIndex = updatedItems.findIndex(
            (item) => item._id === newItem._id
          );
          if (existingIndex === -1) {
            updatedItems.push(newItem);
          } else {
            updatedItems[existingIndex] = newItem;
          }
        });

        setLoadMoreDisabled(updatedItems.length >= totalCount);

        return updatedItems;
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const fetchData = async (isInitialFetch = false) => {
  //   setLoading(true);
  //   setTimeout(async () => {
  //     const skip = isInitialFetch ? 0 : page * ITEMS_PER_PAGE;

  //     const limit = ITEMS_PER_PAGE;

  //     try {
  //       const { data, totalCount } = await serviceFactory.findAll(
  //         id,
  //         skip,
  //         limit
  //       );

  //       setJewelries((prevItems) => {
  //         const updatedItems = [...prevItems];

  //         data.forEach((newItem) => {
  //           const existingIndex = updatedItems.findIndex(
  //             (item) => item._id === newItem._id
  //           );
  //           if (existingIndex === -1) {
  //             updatedItems.push(newItem);
  //           } else {
  //             updatedItems[existingIndex] = newItem;
  //           }
  //         });

  //         setLoadMoreDisabled(updatedItems.length >= totalCount);

  //         return updatedItems;
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 600);
  // };

  useEffect(() => {
    fetchData();
  }, [page]);

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

  return {
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
  };
};
