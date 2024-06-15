import styles from "./JewelryCardHovered.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
export const JewelryCardHovered = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  handleLikeClick,
  slugifiedCategoryTitle,
  slugifiedJewelryTitle,
  isLikedByUser,
  price,
}) => {
  return (
    <article className={styles["jewelry-card-hovered"]}>
      <FontAwesomeIcon
        icon={isLikedByUser ? solidHeart : regularHeart}
        className={styles["heart"]}
        onClick={() => handleLikeClick(_id)}
      />

      <div className={styles["jewelry-card-thumbnail"]}>
        <Link to={`/${slugifiedCategoryTitle}/${slugifiedJewelryTitle}`}>
          <img
            className={styles["jewelry-card-img"]}
            src={firstImageUrl}
            alt={jewelryTitle}
          />
        </Link>
      </div>
      <div className={styles["title-container"]}>
        <h3 className={styles["title"]}>
          {jewelryTitle}
          {price}
        </h3>
      </div>
    </article>
  );
};
