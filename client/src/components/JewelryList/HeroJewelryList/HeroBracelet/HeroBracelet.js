import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroBracelet = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718125861/ReactGems/common_img/Screenshot_2024-06-11_at_20.09.57_cc9fga.png"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            From sparkling diamond bracelets to chic diamond bangles, explore
            the brilliant designs from the House of React Gems'.
          </p>
        </div>
      </div>
    </div>
  );
};
