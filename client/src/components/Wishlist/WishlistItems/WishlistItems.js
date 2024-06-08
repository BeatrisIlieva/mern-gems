import { useContext } from "react";
import { WishlistContext } from "../../../contexts/WishlistContext";
import { JewelryCard } from "../../JewelryCard/JewelryCard";
import { JewelryCardHovered } from "../../JewelryCardHovered/JewelryCardHovered";
import { slugify } from "../../../utils/slugify";

export const WishlistItems = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryTitle,
  isSoldOut,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
  handleLikedByUser,
}) => {
  const { onRemoveFromWishlistClick } = useContext(WishlistContext);

  const slugifiedCategoryTitle = slugify(categoryTitle);
  const slugifiedJewelryTitle = slugify(jewelryTitle);

  const handleLikeClick = () => {
    onRemoveFromWishlistClick(_id);

    handleLikedByUser();
  };

  return (
    <article
      onMouseEnter={() => handleMouseEnter(_id)}
      onMouseLeave={() => handleMouseLeave(_id)}
    >
      {isHovered ? (
        <JewelryCardHovered
          firstImageUrl={firstImageUrl}
          jewelryTitle={jewelryTitle}
          handleLikeClick={handleLikeClick}
          slugifiedCategoryTitle={slugifiedCategoryTitle}
          slugifiedJewelryTitle={slugifiedJewelryTitle}
          isLikedByUser={true}
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
