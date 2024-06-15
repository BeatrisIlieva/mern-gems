import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroNecklace = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718123000/ReactGems/common_img/herolarged_incredibles_yellow_1_w7m1st.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            React Gems's precious gemstones necklaces and pendants, set in
            platinum, offer a more delicate interpretation of the House's
            signature fine jewelry aesthetic.
          </p>
        </div>
      </div>
    </div>
  );
};
