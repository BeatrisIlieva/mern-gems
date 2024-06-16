import styles from "./EmptyBag.module.css"
export const EmptyBag = () => {
  return (
    <section section className={styles["bag-box"]}>
      <div className={styles["bag-sub-title"]}>
        <h3>Your Shopping Bag is Empty.</h3>
        <p>Explore and add something you love.</p>
      </div>
    </section>
  );
};
