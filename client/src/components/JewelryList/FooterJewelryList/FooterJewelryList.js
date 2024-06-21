import { HEROES_BY_TITLE } from "../../../constants/heroes";
import styles from "./FooterJewelryList.module.css";
import { HorizontalLine } from "../../HorizontalLine/HorizontalLine";

export const FooterJewelryList = ({ entityTitle }) => {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["footer-img-container"]}>
        <img
          className={styles["footer-img"]}
          src={HEROES_BY_TITLE[entityTitle][0]}
          alt={"Img"}
        />
      </div>
      <div className={styles["footer-info-container"]}>
        <h2 className={styles["footer-box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["footer-paragraph-container"]}>
          <p className={styles["footer-box-paragraph"]}>
            {HEROES_BY_TITLE[entityTitle][1]}
          </p>
        </div>
      </div>
    </div>
  );
};
