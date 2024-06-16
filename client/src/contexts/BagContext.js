import { createContext, useContext, useState, useEffect } from "react";
import { bagServiceFactory } from "../services/bagService";
import { useService } from "../hooks/useService";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const bagService = useService(bagServiceFactory);
  const [bagCount, setBagCount] = useState(0);
  const bagCountGreaterThanZero = bagCount > 0;

  const fetchData = async () => {
    try {
      const data = await bagService.findCount();

      setBagCount(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bagCount]);

  const onAddToBagClick = async (jewelryId) => {
    try {
      const result = await bagService.create(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onRemoveFromBagClick = async (jewelryId) => {
    try {
      const result = await bagService.delete(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const context = {
    onAddToBagClick,
    onRemoveFromBagClick,
    bagCount,
    bagCountGreaterThanZero,
  };

  return (
    <BagContext.Provider value={context}>
      {children}
    </BagContext.Provider>
  );
};

export const useBagContext = () => {
  const context = useContext(BagContext);

  return context;
};
