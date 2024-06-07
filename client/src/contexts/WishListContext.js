import { createContext, useContext, useState, useEffect } from "react";
import { wishListServiceFactory } from "../services/wishListService";
import { useService } from "../hooks/useService";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const wishlistService = useService(wishListServiceFactory);
  const [wishlistCount, setWishlistCount] = useState(0);
  const wishListCountGreaterThanZero = wishlistCount > 0;

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
  }, [jewelries]);

  useEffect(() => {
    setWishlistCount(jewelries.length);
  }, [jewelries]);

  const onAddToWishListClick = async (jewelryId) => {
    try {
      const result = await wishlistService.create(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onRemoveFromWishListClick = async (jewelryId) => {
    try {
      const result = await wishlistService.delete(jewelryId);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const context = {
    onAddToWishListClick,
    onRemoveFromWishListClick,
    wishlistCount,
    wishListCountGreaterThanZero,
    jewelries,
  };

  return (
    <WishListContext.Provider value={context}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);

  return context;
};
