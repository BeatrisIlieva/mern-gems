import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroDiamondLoop = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718557542/ReactGems/common_img/herolarged_pdp_diamondloop_hgmz3j.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container-diamond-loop"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            In this exquisite interpretation, the delicate details of the loop
            motif re-imagine the beloved stone’s graceful lines through an
            elegant collection of everyday jewels.
          </p>
        </div>
      </div>
    </div>
  );
};
