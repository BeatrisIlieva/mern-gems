import { WishlistItems } from "./WishlistItems/WishlistItems";
import { useEffect, useState } from "react";
import { wishlistServiceFactory } from "../../services/wishlistService";
import { useService } from "../../hooks/useService";
import styles from "./Wishlist.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const Wishlist = () => {
  const [jewelries, setJewelries] = useState([]);
  const wishlistService = useService(wishlistServiceFactory);

  let [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await wishlistService.findAll();
      setJewelries(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleLikedByUser = () => {
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 600);
  };

  return (
    <section className={styles["wishlist-box"]}>
      <div className={styles["wishlist-container"]}>
        {jewelries.map((j) => (
          <WishlistItems
            key={j._id}
            {...j}
            handleMouseEnter={handleMouseEnter}
            handleLikedByUser={handleLikedByUser}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      {loading && <LoadingSpinner />}
    </section>
  );
};
