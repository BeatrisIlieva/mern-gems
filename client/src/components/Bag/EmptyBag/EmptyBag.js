import styles from "./EmptyBag.module.css"
import { HeroBracelet } from "../../JewelryList/HeroJewelryList/HeroBracelet/HeroBracelet";
export const EmptyBag = () => {
  return (
    <section section className={styles["empty-bag-box"]}>
      <div className={styles["bag-sub-title"]}>
        <h3>Your Shopping Bag is Empty.</h3>
        <p>Explore and add something you love.</p>
      </div>
      <HeroBracelet/>
    </section>
  );
};
