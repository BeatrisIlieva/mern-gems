import { createContext, useContext, useState, useEffect } from "react";
import { wishlistServiceFactory } from "../services/wishlistService";
import { useService } from "../hooks/useService";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const wishlistService = useService(wishlistServiceFactory);
  const [wishlistCount, setWishlistCount] = useState(0);
  const wishlistCountGreaterThanZero = wishlistCount > 0;
  const [jewelries, setJewelries] = useState([]);

  const fetchData = async () => {
    try {
      const data = await wishlistService.findAll();
      setJewelries(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [wishlistCount]);

  useEffect(() => {
    setWishlistCount(jewelries.length);
  }, [jewelries]);

  const onAddToWishlistClick = async (jewelryId) => {
    try {
      const result = await wishlistService.create(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onRemoveFromWishlistClick = async (jewelryId) => {
    try {
      const result = await wishlistService.delete(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const context = {
    onAddToWishlistClick,
    onRemoveFromWishlistClick,
    // fetchData,
    wishlistCount,
    wishlistCountGreaterThanZero,
    // setJewelries,
    // jewelries,
  };

  return (
    <WishlistContext.Provider value={context}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);

  return context;
};
