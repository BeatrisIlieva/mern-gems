import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { jewelryServiceFactory } from "../../services/jewelryService";
import styles from "./JewelryItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export const JewelryItem = () => {
  const { _id } = useParams();
  const [jewelry, setJewelry] = useState([]);
  const jewelryService = useService(jewelryServiceFactory);
  const [leftIsSelected, setLeftIsSelected] = useState(true);
  const [rightIsSelected, setRightIsSelected] = useState(false);

  const toggleSelected = () => {
    setLeftIsSelected(!leftIsSelected);
    setRightIsSelected(!rightIsSelected);
  };

  useEffect(() => {
    fetchJewelry();
  }, []);

  const fetchJewelry = async () => {
    try {
      const data = await jewelryService.findOne(_id);

      const jewelryData = Array.isArray(data) ? data[0] : data;
      setJewelry(jewelryData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className={styles["jewelry-details-box"]}>
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
        <div className={styles["jewelry-description"]}></div>
      </div>
    </section>
  );
};
