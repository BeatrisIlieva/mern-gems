import styles from "./EmptyBag.module.css";
import { HeroForgetMeNot } from "../../JewelryList/HeroJewelryList/HeroForgetMeNot/HeroForgetMeNot";
import { HeroClassics } from "../../JewelryList/HeroJewelryList/HeroClassics/HeroClassics";
import { HeroPirouette } from "../../JewelryList/HeroJewelryList/HeroPirouette/HeroPirouette";
import { HeroDiamondLoop } from "../../JewelryList/HeroJewelryList/HeroDiamondLoop/HeroDiamondLoop";
import { HeroSunflower } from "../../JewelryList/HeroJewelryList/HeroSunflower/HeroSunflower";
import { HeroSparklingCluster } from "../../JewelryList/HeroJewelryList/HeroSparklingCluster/HeroSparklingCluster";
export const EmptyBag = () => {
  return (
    <section className={styles["empty-bag-box"]}>
      <div className={styles["bag-sub-title"]}>
        <h3>Your Shopping Bag is Empty.</h3>
        <p>Explore and add something you love.</p>
      </div>
      <HeroForgetMeNot />
      <HeroClassics />
      <HeroPirouette />
      <HeroDiamondLoop />
      <HeroSunflower />
      <HeroSparklingCluster />
    </section>
  );
};
