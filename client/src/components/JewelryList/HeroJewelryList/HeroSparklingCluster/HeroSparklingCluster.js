import { HorizontalLine } from "../../../HorizontalLine/HorizontalLine";
import styles from "../HeroJewelryList.module.css";

export const HeroSparklingCluster = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1716995569/collections/sparklingcluster_hpovka.webp"
          }
          alt={"Img"}
        />
      </div>
      {/* <div className={styles["info-container-sparkling-cluster"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            Sparkling Cluster is a stunning fine jewelry collection that recalls
            enduring commitment to making brilliant celebrations shine even
            brighter with magnificent diamonds. Round brilliant and pear-shaped
            diamonds, set in a feminine and fluid pattern, seemingly float
            against the wearer and sparkle with unparalleled brilliance.
          </p>
        </div>
      </div> */}
    </div>
  );
};
