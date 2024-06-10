import { WishlistItems } from "./WishlistItems/WishlistItems";
import { wishlistServiceFactory } from "../../services/wishlistService";
import styles from "./Wishlist.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect } from "react";

export const Wishlist = () => {
  const {
    setJewelries,
    jewelries,
    loadMoreDisabled,
    loading,
    handleLoadMore,
    handleMouseEnter,
    handleMouseLeave,
    fetchData,
    setPage,
  } = useJewelryList(wishlistServiceFactory);

  const { wishlistCount, wishlistCountGreaterThanZero } = useWishlistContext();

  useEffect(() => {
    fetchData(true);
    setPage(0);
  }, [wishlistCount]);

  const handleLikedByUser = (_id) => {
    setJewelries((prevJewelries) =>
      prevJewelries.filter((jewelry) => !jewelry._id)
    );
    fetchData(true);
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
        <div className={styles["load-more-button"]}>
          <LoadMoreButton
            handleLoadMore={handleLoadMore}
            loadMoreDisabled={loadMoreDisabled}
          />
        </div>
        {loading && <LoadingSpinner />}
      </section>
    </>
  );
};
