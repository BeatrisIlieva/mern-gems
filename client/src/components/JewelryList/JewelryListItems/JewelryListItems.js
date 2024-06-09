import { useContext } from "react";
import { WishlistContext } from "../../../contexts/WishlistContext";
import { JewelryCard } from "../../JewelryCard/JewelryCard";
import { JewelryCardHovered } from "../../JewelryCardHovered/JewelryCardHovered";
import { slugify } from "../../../utils/slugify";

export const JewelryListItems = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryTitle,
  isLikedByUser,
  isSoldOut,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
  handleLikedByUser,
}) => {
  const { onAddToWishlistClick, onRemoveFromWishlistClick } =
    useContext(WishlistContext);

  const slugifiedCategoryTitle = slugify(categoryTitle);
  const slugifiedJewelryTitle = slugify(jewelryTitle);

  const handleLikeClick = (_id) => {
    if (isLikedByUser) {
      onRemoveFromWishlistClick(_id);
    } else {
      onAddToWishlistClick(_id);
    }
    handleLikedByUser(_id);
  };

  return (
    <article
      onMouseEnter={() => handleMouseEnter(_id)}
      onMouseLeave={() => handleMouseLeave(_id)}
    >
      {isHovered && !isSoldOut ? (
        <JewelryCardHovered
          _id={_id}
          firstImageUrl={firstImageUrl}
          jewelryTitle={jewelryTitle}
          handleLikeClick={handleLikeClick}
          slugifiedCategoryTitle={slugifiedCategoryTitle}
          slugifiedJewelryTitle={slugifiedJewelryTitle}
          isLikedByUser={isLikedByUser}
        />
      ) : (
        <JewelryCard
          firstImageUrl={firstImageUrl}
          jewelryTitle={jewelryTitle}
          isSoldOut={isSoldOut}
        />
      )}
    </article>
  );
};
