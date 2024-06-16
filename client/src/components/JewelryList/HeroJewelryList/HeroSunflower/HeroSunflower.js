import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroSunflower = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718558072/ReactGems/common_img/herolarged_sunflower24_pdp_ogqv7s.jpg"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container-sunflower"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            Renowned for their fiery beauty, the sunflower is undeniably one of
            nature’s most magnificent creations.
          </p>
        </div>
      </div>
    </div>
  );
};
