import styles from "./VerticalLine.module.css"

export const VerticalLine = () => {
  return (
    <div className={styles["flex-container-line"]}>
      <hr className={styles["hr-line"]} />
      <img
        className={styles["line-img"]}
        src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
        alt=""
      />
      <hr className={styles["hr-line"]} />
    </div>
  );
};
