import { WishlistItems } from "./WishlistItems/WishlistItems";
import { wishlistServiceFactory } from "../../services/wishlistService";
import styles from "./Wishlist.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constants/pagination";

export const Wishlist = ({  serviceFactory }) => {

  const {
    setJewelries,
    jewelries,
    loading,
    mouseEnterHandler,
    mouseLeaveHandler,
    fetchData,
    totalCount,
    loadMoreDisabled,
    setLoadMoreDisabled,
    setFilteredJewelries,
    filteredJewelries,
    setTotalCount,
  } = useJewelryList(serviceFactory);

  console.log(filteredJewelries)

  const { wishlistCount, wishlistCountGreaterThanZero } = useWishlistContext();

  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    fetchData();
    setPage(0);
  }, [wishlistCount]);

  const toggleLike = (_id) => {
    setJewelries((prevJewelries) =>
      prevJewelries.filter((jewelry) => !jewelry._id)
    );
  };

  const loadMoreHandler = () => {
    const nextPage = page + 1;
    if (nextPage * ITEMS_PER_PAGE >= totalCount) {
      setLoadMoreDisabled(true);
    }
    setPage(nextPage);

    const newDisplayedItems = displayedItems + ITEMS_PER_PAGE;
    if (newDisplayedItems >= totalCount) {
      setLoadMoreDisabled(true);
    }
    setDisplayedItems(newDisplayedItems);
  };

  // const displayedJewelries = jewelries.slice(0, displayedItems);

  const displayedJewelries = filteredJewelries.slice(0, displayedItems);

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
      {wishlistCount > 0 && (
        <section className={styles["wishlist-box"]}>
          <div className={styles["wishlist-container"]}>
            {displayedJewelries.map((j) => (
              <WishlistItems
                key={j._id}
                {...j}
                mouseEnterHandler={mouseEnterHandler}
                toggleLike={toggleLike}
                mouseLeaveHandler={mouseLeaveHandler}
              />
            ))}
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className={styles["load-more-button"]}>
              <LoadMoreButton
                loadMoreHandler={loadMoreHandler}
                loadMoreDisabled={loadMoreDisabled}
              />
            </div>
          )}
        </section>
      )}
    </>
  );
};
