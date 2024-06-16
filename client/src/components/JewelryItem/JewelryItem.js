import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { jewelryServiceFactory } from "../../services/jewelryService";
import styles from "./JewelryItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useBagContext } from "../../contexts/BagContext";

const SizeFormKeys = {
  Size: "size",
};

export const JewelryItem = () => {
  const { _id } = useParams();
  const [jewelry, setJewelry] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const [leftIsSelected, setLeftIsSelected] = useState(true);
  const [rightIsSelected, setRightIsSelected] = useState(false);
  let [loading, setLoading] = useState(true);
  const { onAddToWishlistClick, onRemoveFromWishlistClick } =
    useWishlistContext();
  const {onAddToBagClick} = useBagContext()

  const toggleSelected = () => {
    setLeftIsSelected(!leftIsSelected);
    setRightIsSelected(!rightIsSelected);
  };

  useEffect(() => {
    fetchData();
  }, [_id]);

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

  const handleLikeClick = () => {
    if (jewelry.isLikedByUser) {
      onRemoveFromWishlistClick(jewelry._id);
    } else {
      onAddToWishlistClick(jewelry._id);
    }
    fetchData();
  };

  const [values, setValues] = useState({ [SizeFormKeys.Size]: 0 });

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (jewelry.category === "2") {
      const sizeId = jewelry.sizes[0]._id;

      await onAddToBagClick({ size: sizeId }, jewelry._id);
    } else {
      await onAddToBagClick(values, jewelry._id);
    }

    fetchData();
  };

  return (
    <section className={styles["jewelry-details-box"]}>
      {jewelry && (
        <div className={styles["jewelry-container"]}>
          <div className={styles["jewelry-images"]}>
            {leftIsSelected ? (
              <div
                className={`${styles["image"]} ${
                  jewelry.isSoldOut === true ? styles["sold-out"] : ""
                }`.trim()}
              >
                {" "}
                <img
                  src={jewelry.firstImageUrl}
                  alt={jewelry.title}
                  onClick={toggleSelected}
                  className={styles["left-image"]}
                />
                {jewelry.isSoldOut && (
                  <span className={styles["sold-out-span"]}>SOLD OUT</span>
                )}
              </div>
            ) : (
              <div
                className={`${styles["image"]} ${
                  jewelry.isSoldOut === true ? styles["sold-out"] : ""
                }`.trim()}
              >
                <img
                  src={jewelry.secondImageUrl}
                  alt={jewelry.title}
                  onClick={toggleSelected}
                  className={styles["right-image"]}
                />
                {jewelry.isSoldOut && (
                  <span className={styles["sold-out-span"]}>SOLD OUT</span>
                )}
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
            </p>
            {jewelry.category !== 2 && jewelry.sizes ? (
              <div>
                <h4>Size</h4>
                <form onSubmit={onSubmit} method="POST">
                  <div className={styles["radio-container"]}>
                    {jewelry.sizes.map((item) =>
                      item.available ? (
                        <div key={item._id}>
                          <input
                            type="radio"
                            name={SizeFormKeys.Size}
                            id={item._id}
                            value={item._id}
                            onChange={changeHandler}
                            checked={
                              Number(values[SizeFormKeys.Size]) === item._id
                            }
                          />
                          <label className={styles["label"]} htmlFor={item._id}>
                            {item.measurement}
                          </label>
                        </div>
                      ) : (
                        <div key={item._id}>
                          <input
                            type="radio"
                            disabled
                            name={SizeFormKeys.Size}
                            id={item._id}
                            value={item._id}
                            onChange={changeHandler}
                            checked={
                              Number(values[SizeFormKeys.Size]) === item._id
                            }
                          />
                          <label htmlFor={item._id}>{item.measurement}</label>
                        </div>
                      )
                    )}
                  </div>
                  <div className={styles["button-container"]}>
                    <button
                      className={`${styles["add-to-bag-button"]} ${
                        jewelry.isSoldOut === true
                          ? styles["button-disabled"]
                          : ""
                      }`.trim()}
                      // onClick={loadMoreHandler}
                      disabled={jewelry.isSoldOut}
                    >
                      <span className={styles["price-span"]}>
                        ${jewelry.price}
                      </span>{" "}
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
                </form>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}
    </section>
  );
};
