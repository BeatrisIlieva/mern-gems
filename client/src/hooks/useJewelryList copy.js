import { useEffect, useState } from "react";
import { useService } from "../hooks/useService";
import { ITEMS_PER_PAGE } from "../constants/pagination";
import { SORT_BY_OPTIONS } from "../constants/sortBy";

export const useJewelryList = (fetchDataFunction, id = null) => {
  const [jewelries, setJewelries] = useState([]);
  const serviceFactory = useService(fetchDataFunction);
  const [page, setPage] = useState(0);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);
  const [sortByAvailableNow, setSortByAvailableNow] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);
  let [loading, setLoading] = useState(true);
  let [defaultSortBy, setDefaultSortBy] = useState(SORT_BY_OPTIONS.IsSoldOut)

  const fetchData = async (isInitialFetch = false, sortBy = defaultSortBy) => {
    setLoading(true);

    const skip = isInitialFetch ? 0 : page * ITEMS_PER_PAGE;

    const limit = ITEMS_PER_PAGE;

    setTimeout(async () => {
      try {
        const { data, totalCount } = await serviceFactory.findAll(
          id,
          skip,
          limit,
          sortBy
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

          // let sortedJewelries;

          // if (sortByAvailableNow === true) {
          //    sortedJewelries = [...updatedItems].sort((a, b) => {
          //     return a.isSoldOut - b.isSoldOut;
          //   });
          //   // getSortedByAvailableNow();
          // } else if (sortByLowToHigh === true) {
          //    sortedJewelries = [...updatedItems].sort((a, b) => {
          //     return a.price - b.price;
          //   });
        
          //   setJewelries(sortedJewelries);
          //   // getSortedByLowToHigh();
          // } else if (sortByHighToLow === true) {
          //    sortedJewelries = [...updatedItems].sort((a, b) => {
          //     return b.price - a.price;
          //   });
          //   // getSortedByHighToLow();
          // }

          // setJewelries(sortedJewelries);

          return updatedItems;
        });

      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const loadMoreHandler = () => {
    setPage((prevPage) => prevPage + 1);
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

  const clickSortByAvailableNowHandler = () => {
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);

    setDefaultSortBy(SORT_BY_OPTIONS.IsSoldOut)

    fetchData(false, defaultSortBy);

    // getSortedByAvailableNow();
  };

  const clickSortByLowToHighHandler = () => {
    setSortByAvailableNow(false);
    setSortByLowToHigh(true);
    setSortByHighToLow(false);

    setDefaultSortBy(SORT_BY_OPTIONS.PriceAsc)

    fetchData(false, defaultSortBy);

    // fetchData(false, SORT_BY_OPTIONS.PriceAsc);

    // getSortedByLowToHigh();
  };

  const clickSortByHighToLowHandler = () => {
    setSortByAvailableNow(false);
    setSortByLowToHigh(false);
    setSortByHighToLow(true);

    setDefaultSortBy(SORT_BY_OPTIONS.PriceDesc)

    fetchData(false, defaultSortBy);

    // fetchData(false, SORT_BY_OPTIONS.PriceDesc);

    // getSortedByHighToLow();
  };

  // const getSortedByLowToHigh = () => {
  //   const sortedJewelries = [...jewelries].sort((a, b) => {
  //     return a.price - b.price;
  //   });

  //   setJewelries(sortedJewelries);
  // };

  // const getSortedByHighToLow = () => {
  //   const sortedJewelries = [...jewelries].sort((a, b) => {
  //     return b.price - a.price;
  //   });

  //   setJewelries(sortedJewelries);
  // };

  // const getSortedByAvailableNow = () => {
  //   const sortedJewelries = [...jewelries].sort((a, b) => {
  //     return a.isSoldOut - b.isSoldOut;
  //   });

  //   setJewelries(sortedJewelries);
  // };

  return {
    setJewelries,
    jewelries,
    loadMoreDisabled,
    loading,
    loadMoreHandler,
    mouseEnterHandler,
    mouseLeaveHandler,
    fetchData,
    setPage,
    setLoading,
    setSortByAvailableNow,
    setSortByLowToHigh,
    setSortByHighToLow,
    sortByAvailableNow,
    sortByLowToHigh,
    sortByHighToLow,
    clickSortByAvailableNowHandler,
    clickSortByLowToHighHandler,
    clickSortByHighToLowHandler,
    defaultSortBy
  };
};
