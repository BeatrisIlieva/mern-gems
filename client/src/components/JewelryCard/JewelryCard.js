import styles from "./JewelryCard.module.css";

export const JewelryCard = ({ firstImageUrl, jewelryTitle, isSoldOut }) => {
  console.log(isSoldOut);
  return (
    <article className={styles["jewelry-card"]}>
      <div
        className={
          isSoldOut
            ? styles["jewelry-card-thumbnail-sold-out"]
            : styles["jewelry-card-thumbnail"]
        }
      >
        <img
          className={styles["jewelry-card-img"]}
          src={firstImageUrl}
          alt={jewelryTitle}
        />
      </div>
      {isSoldOut && <span className={styles["sold-out"]}>SOLD OUT</span>}
    </article>
  );
};
