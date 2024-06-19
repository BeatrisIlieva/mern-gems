import styles from "./EmptyBag.module.css";
import { HeroForgetMeNot } from "../../JewelryList/HeroJewelryList/HeroForgetMeNot/HeroForgetMeNot";
import { HeroClassics } from "../../JewelryList/HeroJewelryList/HeroClassics/HeroClassics";
import { HeroPirouette } from "../../JewelryList/HeroJewelryList/HeroPirouette/HeroPirouette";
import { HeroDiamondLoop } from "../../JewelryList/HeroJewelryList/HeroDiamondLoop/HeroDiamondLoop";
import { HeroSunflower } from "../../JewelryList/HeroJewelryList/HeroSunflower/HeroSunflower";
import { HeroSparklingCluster } from "../../JewelryList/HeroJewelryList/HeroSparklingCluster/HeroSparklingCluster";
import { Link } from "react-router-dom";
export const EmptyBag = () => {
  return (
    <section className={styles["empty-bag-box"]}>
      <div className={styles["bag-sub-title"]}>
        <h3>Your Shopping Bag is Empty.</h3>
        <p>Explore and add something you love.</p>
      </div>
      <Link to="/forget-me-not" className={styles["no-decoration"]}>
        <HeroForgetMeNot />
      </Link>
      <Link to="/classics" className={styles["no-decoration"]}>
        <HeroClassics />
      </Link>
      <Link to="/pirouette" className={styles["no-decoration"]}>
        <HeroPirouette />
      </Link>
      <Link to="/diamond-loop" className={styles["no-decoration"]}>
        <HeroDiamondLoop />
      </Link>
      <Link to="/sunflower" className={styles["no-decoration"]}>
        <HeroSunflower />
      </Link>
      <Link to="/sparkling-cluster" className={styles["no-decoration"]}>
        <HeroSparklingCluster />
      </Link>
    </section>
  );
};
