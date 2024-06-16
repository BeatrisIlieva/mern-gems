import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroForgetMeNot = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1718556061/ReactGems/common_img/herolarged_pdp_forget-me-not_l7zskd.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container-forget-me-not"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            Nature, the House's enduring muse, continues to inspire ethereal
            fine jewelry designs destined to stand the test of time. The
            enchanting and delicate beauty of a Forget-Me-Not flower in bloom is
            captured in a series of fine jewelry designs that celebrate the
            endless beauty of nature’s greatest gifts – rare gemstones and
            flowers in bloom.
          </p>
        </div>
      </div>
    </div>
  );
};
