import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroClassics = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718556853/ReactGems/common_img/prod_fe_br_23_wdj_a_oaoeuu.webp"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container-classics"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            Using near invisible platinum settings, stones are meticulously set
            by hand and appear to float in their settings, emphasizing the
            inherent beauty and fire of each individual gem.
          </p>
        </div>
      </div>
    </div>
  );
};
