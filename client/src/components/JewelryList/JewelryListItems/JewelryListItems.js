import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WishlistContext } from "../../../contexts/WishlistContext";
import styles from "./JewelryListItems.module.css";

export const JewelryListItems = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryId,
  categoryTitle,
  price,
  isLikedByUser,
  isSoldOut,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
  handleLikedByUser,
}) => {
  const { onAddToWishlistClick, onRemoveFromWishlistClick } =
    useContext(WishlistContext);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const slugifiedCategoryTitle = slugify(categoryTitle);
  const slugifiedJewelryTitle = slugify(jewelryTitle);

  return (
    <article className={styles["jewelry-card"]}>
      {!isSoldOut && (
        <div className={styles["jewelry-card-thumbnail"]}>
          {isLikedByUser === true ? (
            <FontAwesomeIcon
              icon={solidHeart}
              className={`${styles["heart"]}`}
              onClick={() => {
                onRemoveFromWishlistClick(_id);
                handleLikedByUser();
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={regularHeart}
              className={`${styles["heart"]}`}
              onClick={() => {
                onAddToWishlistClick(_id);
                handleLikedByUser();
              }}
            />
          )}
          <Link to={`/${slugifiedCategoryTitle}/${slugifiedJewelryTitle}}`}>
            <img
              className={styles["jewelry-card-img"]}
              src={firstImageUrl}
              alt={jewelryTitle}
              onMouseEnter={() => handleMouseEnter(_id)}
              onMouseLeave={() => handleMouseLeave(_id)}
              onBlur={() => handleMouseEnter(_id)}
            />
            {isHovered && (
              // <div className={styles["hovered"]}>
                <div className={styles["hovered-content"]}>
                  <h3 className={styles["hovered-content-title"]}>
                    {jewelryTitle}
                  </h3>
                </div>
              // </div>
            )}
          </Link>
        </div>
      )}
      {isSoldOut && (
        <div className={styles["jewelry-card-thumbnail-sold-out"]}>
          <img
            className={styles["jewelry-card-img-sold-out"]}
            src={firstImageUrl}
            alt={jewelryTitle}
          />
          <span className={styles["sold-out"]}>SOLD OUT</span>
        </div>
      )}
    </article>
  );
};
