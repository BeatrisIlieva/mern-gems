import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroEarring = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718118512/ReactGems/common_img/largeherod_l2_hj_incre_heartshape_ea_main_rjzvzb.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            From floral fine jewelry styles to bold designs, to classic
            earstuds, chandeliers and diamond drops, explore React Gems'
            selection of diamond earrings.
          </p>
        </div>
      </div>
    </div>
  );
};
