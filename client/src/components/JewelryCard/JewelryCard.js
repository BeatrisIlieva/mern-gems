import styles from "./JewelryCard.module.css";

export const JewelryCard = ({ firstImageUrl, jewelryTitle }) => {
  return (
    <article className={styles["jewelry-card"]}>
      <div className={styles["jewelry-card-thumbnail"]}>
        <img
          className={styles["jewelry-card-img"]}
          src={firstImageUrl}
          alt={jewelryTitle}
        />
      </div>
    </article>
  );
};
