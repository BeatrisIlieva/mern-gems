import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { jewelryServiceFactory } from "../../services/jewelryService";
import styles from "./JewelryItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const JewelryItem = () => {
  const { _id } = useParams();
  const [jewelry, setJewelry] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const [leftIsSelected, setLeftIsSelected] = useState(true);
  const [rightIsSelected, setRightIsSelected] = useState(false);
  let [loading, setLoading] = useState(true);
  const { onAddToWishlistClick, onRemoveFromWishlistClick } =
    useWishlistContext();

  const toggleSelected = () => {
    setLeftIsSelected(!leftIsSelected);
    setRightIsSelected(!rightIsSelected);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const data = await jewelryService.findOne(_id);

        const jewelryData = Array.isArray(data) ? data[0] : data;
        setJewelry(jewelryData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  //   const fetchJewelry = async () => {
  //     try {
  //       const data = await jewelryService.findOne(_id);

  //       const jewelryData = Array.isArray(data) ? data[0] : data;
  //       setJewelry(jewelryData);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  const handleLikeClick = () => {
    if (jewelry.isLikedByUser) {
      onRemoveFromWishlistClick(jewelry._id);
    } else {
      onAddToWishlistClick(jewelry._id);
    }
    fetchData();
  };

  return (
    <section className={styles["jewelry-details-box"]}>
      {jewelry && (
        <div className={styles["jewelry-container"]}>
          <div className={styles["jewelry-images"]}>
            {leftIsSelected ? (
              <div className={styles["image"]}>
                {" "}
                <img
                  src={jewelry.firstImageUrl}
                  alt={jewelry.title}
                  onClick={toggleSelected}
                  className={styles["left-image"]}
                />
              </div>
            ) : (
              <div className={styles["image"]}>
                <img
                  src={jewelry.secondImageUrl}
                  alt={jewelry.title}
                  onClick={toggleSelected}
                  className={styles["right-image"]}
                />
              </div>
            )}
            <div className={styles["circles-container"]}>
              <FontAwesomeIcon
                icon={faCircle}
                className={`${styles["circle"]} ${
                  leftIsSelected === true ? styles["photo-selected"] : ""
                }`.trim()}
              />
              <FontAwesomeIcon
                icon={faCircle}
                className={`${styles["circle"]} ${
                  rightIsSelected === true ? styles["photo-selected"] : ""
                }`.trim()}
              />
            </div>
          </div>
          <div className={styles["jewelry-info-container"]}>
            <h2 className={styles["jewelry-title"]}>{jewelry.title}</h2>
            <div className={styles["flex-container-line"]}>
              <hr className={styles["hr-line"]} />
              <img
                className={styles["line-img"]}
                src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                alt=""
              />
              <hr className={styles["hr-line"]} />
            </div>
            <p className={styles["jewelry-description"]}>
              {jewelry.description}.{" "}
              {jewelry.sizes &&
                jewelry.category === 2 &&
                jewelry.sizes[0].measurement}
              .
            </p>
            <div className={styles["button-container"]}>
              <button
                className={`${styles["add-to-bag-button"]} ${
                  jewelry.isSoldOut === true ? styles["button-disabled"] : ""
                }`.trim()}
                // onClick={loadMoreHandler}
                disabled={jewelry.isSoldOut}
              >
                <span className={styles["price-span"]}>${jewelry.price}</span>{" "}
                <span className={styles["add-span"]}>Add to Bag</span>
              </button>
              <button className={styles["add-to-wishlist-button"]}>
                <FontAwesomeIcon
                  icon={jewelry.isLikedByUser ? solidHeart : regularHeart}
                  className={styles["heart"]}
                  onClick={() => handleLikeClick(_id)}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}
    </section>
  );
};
