import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroRing = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718123003/ReactGems/common_img/largeherod_l2_hj_hope_2_main_ahryjw.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            React Gems' rings feature the most exceptional diamonds and
            gemstones and are known for their unequivocal beauty.
          </p>
        </div>
      </div>
    </div>
  );
};
