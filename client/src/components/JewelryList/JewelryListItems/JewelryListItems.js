// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
// import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
// import { useContext } from "react";
// import { WishlistContext } from "../../../contexts/WishlistContext";
// import styles from "./JewelryListItems.module.css";

// export const JewelryListItems = ({
//   _id,
//   firstImageUrl,
//   jewelryTitle,
//   categoryId,
//   categoryTitle,
//   price,
//   isLikedByUser,
//   isSoldOut,
//   isHovered,
//   handleMouseEnter,
//   handleMouseLeave,
//   handleLikedByUser,
// }) => {
//   const { onAddToWishlistClick, onRemoveFromWishlistClick } =
//     useContext(WishlistContext);

//   const slugify = (text) => {
//     return text
//       .toString()
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w\-]+/g, "")
//       .replace(/\-\-+/g, "-");
//   };

//   const slugifiedCategoryTitle = slugify(categoryTitle);
//   const slugifiedJewelryTitle = slugify(jewelryTitle);

//   return (
//     <article className={styles["jewelry-card"]}>
//       {!isSoldOut && (
//         <div className={styles["jewelry-card-thumbnail"]}>
//           <Link to={`/${slugifiedCategoryTitle}/${slugifiedJewelryTitle}}`}>
//             <img
//               className={styles["jewelry-card-img"]}
//               src={firstImageUrl}
//               alt={jewelryTitle}
//               onMouseEnter={() => handleMouseEnter(_id)}
//               onMouseLeave={() => handleMouseLeave(_id)}
//               onBlur={() => handleMouseEnter(_id)}
//             />
//             {isHovered && (
//               <div className={styles["hovered-content"]}>
//                 <h3 className={styles["hovered-content-title"]}>
//                   {jewelryTitle}
//                 </h3>
//                 {isLikedByUser === true ? (
//                   <FontAwesomeIcon
//                     icon={solidHeart}
//                     className={`${styles["heart"]}`}
//                     onClick={() => {
//                       onRemoveFromWishlistClick(_id);
//                       handleLikedByUser();
//                     }}
//                   />
//                 ) : (
//                   <FontAwesomeIcon
//                     icon={regularHeart}
//                     className={`${styles["heart"]}`}
//                     onClick={() => {
//                       onAddToWishlistClick(_id);
//                       handleLikedByUser();
//                     }}
//                   />
//                 )}
//               </div>
//             )}
//           </Link>
//         </div>
//       )}
//       {isSoldOut && (
//         <div className={styles["jewelry-card-thumbnail-sold-out"]}>
//           <img
//             className={styles["jewelry-card-img-sold-out"]}
//             src={firstImageUrl}
//             alt={jewelryTitle}
//           />
//           <span className={styles["sold-out"]}>SOLD OUT</span>
//         </div>
//       )}
//     </article>
//   );
// };

// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
// import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
// import { useContext } from "react";
// import { WishlistContext } from "../../../contexts/WishlistContext";
// import styles from "./JewelryListItems.module.css";

// export const JewelryListItems = ({
//   _id,
//   firstImageUrl,
//   jewelryTitle,
//   categoryId,
//   categoryTitle,
//   price,
//   isLikedByUser,
//   isSoldOut,
//   isHovered,
//   handleMouseEnter,
//   handleMouseLeave,
//   handleLikedByUser,
// }) => {
//   const { onAddToWishlistClick, onRemoveFromWishlistClick } =
//     useContext(WishlistContext);

//   const slugify = (text) => {
//     return text
//       .toString()
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w\-]+/g, "")
//       .replace(/\-\-+/g, "-");
//   };

//   const slugifiedCategoryTitle = slugify(categoryTitle);
//   const slugifiedJewelryTitle = slugify(jewelryTitle);

//   const handleLikeClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (isLikedByUser) {
//       onRemoveFromWishlistClick(_id);
//     } else {
//       onAddToWishlistClick(_id);
//     }
//     handleLikedByUser();
//   };

//   return (
//     <article
//       className={styles["jewelry-card"]}
//       onMouseEnter={() => handleMouseEnter(_id)}
//       onMouseLeave={() => handleMouseLeave(_id)}
//     >
//       <div
//         className={
//           isSoldOut
//             ? styles["jewelry-card-thumbnail-sold-out"]
//             : styles["jewelry-card-thumbnail"]
//         }
//       >
//         <Link to={`/${slugifiedCategoryTitle}/${slugifiedJewelryTitle}`}>
//           <img
//             className={
//               isSoldOut
//                 ? styles["jewelry-card-img-sold-out"]
//                 : styles["jewelry-card-img"]
//             }
//             src={firstImageUrl}
//             alt={jewelryTitle}
//           />
//         </Link>
//       </div>
//       {isHovered && !isSoldOut && (
//           <div className={styles["hovered-content"]}>
//             <FontAwesomeIcon
//               icon={isLikedByUser ? solidHeart : regularHeart}
//               className={styles["heart"]}
//               onClick={handleLikeClick}
//             />
//             <h3 className={styles["hovered-content-title"]}>{jewelryTitle}</h3>
//           </div>
//         )}
//         {isSoldOut && <span className={styles["sold-out"]}>SOLD OUT</span>}
//     </article>
//   );
// };

// export default JewelryListItems;

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WishlistContext } from "../../../contexts/WishlistContext";
import styles from "./JewelryListItems.module.css";
import { JewelryCard } from "../../JewelryCard/JewelryCard";
import { JewelryCardHovered } from "../../JewelryCardHovered/JewelryCardHovered";

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

  const handleLikeClick = () => {

    if (isLikedByUser) {
      onRemoveFromWishlistClick(_id);
    } else {
      onAddToWishlistClick(_id);
    }
    handleLikedByUser();
  };

  return (
    <article
      onMouseEnter={() => handleMouseEnter(_id)}
      onMouseLeave={() => handleMouseLeave(_id)}
    >
      {isHovered && !isSoldOut ? (
        <JewelryCardHovered
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

export default JewelryListItems;
