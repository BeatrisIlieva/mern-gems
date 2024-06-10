import { useWishlistContext } from "../../../contexts/WishlistContext";
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
  const { onRemoveFromWishlistClick } =
    useWishlistContext();

  const slugifiedCategoryTitle = slugify(categoryTitle);
  const slugifiedJewelryTitle = slugify(jewelryTitle);

  const handleLikeClick = (_id) => {
    onRemoveFromWishlistClick(_id);

    handleLikedByUser(_id);
  };

  return (
    <article
      onMouseEnter={() => handleMouseEnter(_id)}
      onMouseLeave={() => handleMouseLeave(_id)}
    >
      {isHovered ? (
        <JewelryCardHovered
          _id={_id}
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
