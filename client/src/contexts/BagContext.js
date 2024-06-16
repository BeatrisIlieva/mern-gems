import { createContext, useContext, useState, useEffect } from "react";
import { bagServiceFactory } from "../services/bagService";
import { useService } from "../hooks/useService";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const bagService = useService(bagServiceFactory);
  let [bagItems, setBagItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const totalQuantityGreaterThanZero = totalQuantity > 0;
  const userId = localStorage.getItem("userUUID");
  let [loading, setLoading] = useState(true);

  //   const fetchBagItemsData = async () => {
  //     try {
  //       const count = await bagService.findCount();

  //       setBagCount(count);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  useEffect(() => {
    fetchBagItemsData();
  }, []);

  //   useEffect(() => {
  //     fetchBagItemsData();
  //   }, [totalQuantity]);

  const onAddToBagClick = async (data, _id) => {
    try {
      const result = await bagService.create(data, _id);

      fetchBagItemsData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBagItemsData = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        console.log("after delete")
        let data = await onDisplayBagClick();
        data = Array.isArray(data) ? data[0] : data;
        console.log(data);

        if (data && data.jewelries && data.jewelries.length > 0) {
          const bagData = data.jewelries;
          const bagItems = bagData[0].documents;
          setBagItems(bagItems);

          const totalPrice = bagData[0].totalTotalPrice;
          setTotalPrice(totalPrice);

          const totalQuantity = bagData[0].totalQuantity;
          setTotalQuantity(totalQuantity);
        } else {
          setBagItems([]);
          setTotalQuantity(0);
          setTotalPrice(0);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const onDisplayBagClick = async () => {
    try {
      const data = await bagService.findAll(userId);

      return data;
    } catch (error) {
      console.error("Error removing item from bag:", error);
    }
  };

  const onRemove = async (bagId) => {
    try {
      const result = await bagService.delete(bagId);
      fetchBagItemsData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onDecrement = async (bagId) => {
    await bagService.decrease(bagId);

    fetchBagItemsData();
  };

  const onIncrement = async (bagId) => {
    await bagService.increase(bagId);

    fetchBagItemsData();
  };

  const onQuantityChange = (e, _id) => {
    const newQuantity =
      e.target.value.trim() === "" ? "" : parseInt(e.target.value);

    bagItems = bagItems.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setBagItems([...bagItems]);
  };

  const onBlur = async (_id, quantity) => {
    try {
      await bagService.update(_id, { quantity: quantity });

      setBagItems([...bagItems]);

      fetchBagItemsData();
    } catch (error) {
      console.error("Error updating quantity in the database:", error);
    }
  };

  const clearShoppingBag = () => {
    setBagItems([]);
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const isEmpty = bagItems.length < 1;

  const context = {
    bagItems,
    onAddToBagClick,
    onDisplayBagClick,
    totalPrice,
    totalQuantity,
    totalQuantityGreaterThanZero,
    onDecrement,
    onIncrement,
    onRemove,
    onQuantityChange,
    onBlur,
    isEmpty,
    clearShoppingBag,
    loading,
  };

  return <BagContext.Provider value={context}>{children}</BagContext.Provider>;
};

export const useBagContext = () => {
  const context = useContext(BagContext);

  return context;
};
