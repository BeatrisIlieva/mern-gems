import { WishlistItems } from "./WishlistItems/WishlistItems";
import { useEffect, useState } from "react";
import { wishlistServiceFactory } from "../../services/wishlistService";
import { useService } from "../../hooks/useService";
import styles from "./Wishlist.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useWishlistContext } from "../../contexts/WishlistContext";

export const Wishlist = () => {
  const [jewelries, setJewelries] = useState([]);
  const wishlistService = useService(wishlistServiceFactory);
  const { wishlistCount, wishlistCountGreaterThanZero } = useWishlistContext();

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
  }, [wishlistCount]);

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
    <>
      <article className={styles["wish-list-card"]}>
        <img
          className={styles["img-bg"]}
          src="https://res.cloudinary.com/deztgvefu/image/upload/v1717862155/template_images/herolarged_ny24_plp_ma_necklace_lli7k9.avif"
          alt="image"
        />
        <div className={styles["wish-list-content-top"]}>
          {wishlistCountGreaterThanZero ? (
            <>
              <h2 className={styles["wish-list-tag"]}>
                Your Wish List ({wishlistCount})
              </h2>
              <p className={styles["wish-list-title"]}>
                Your favorite item(s) are below.
                <br />
                Wishes can come true, especially when you dream.
              </p>
            </>
          ) : (
            <h2>Your Wish List (0)</h2>
          )}
        </div>
      </article>
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
    </>
  );
};
