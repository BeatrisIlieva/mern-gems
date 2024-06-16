import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroPirouette = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718557261/ReactGems/common_img/sbs_lp_pirouette_rcbdsf.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container-forget-me-not"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            With dazzling marquise and round brilliant diamonds set in platinum,
            the series is a rare achievement of luminous beauty. The pieces in
            the collection capture and reflect light in a delightful dance that
            will thrill your senses and captivate your heart.
          </p>
        </div>
      </div>
    </div>
  );
};
