import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { VerticalLine } from "../VerticalLine/VerticalLine";

export const Home = () => {
  return (
    <section className={styles["hero"]}>
      <Link to="/" className={styles["no-decoration"]}>
        <div className={styles["hero-box"]}>
          <div className={styles["hero-text"]}>
            <h2 className={styles["title"]}>Forget-Me-Not Collection</h2>
            <p className={styles["paragraph"]}>
              An enchanting medley of round brilliant, pear-shaped and marquise
              stones that together reveal a beautiful flower.
            </p>
            <button className={styles["animated-button"]}>Discover</button>
          </div>
          <img
            className={styles["hero-img"]}
            src={
              "https://res.cloudinary.com/deztgvefu/image/upload/v1716995569/collections/forgetmenot_rz0umv.png"
            }
            alt={"Img"}
          />
        </div>
      </Link>
      <VerticalLine />
      <Link to="/" className={styles["no-decoration"]}>
        <div className={styles["hero-box-reverse"]}>
          <div className={styles["hero-text"]}>
            <h2 className={styles["title"]}>Pirouette Collection</h2>
            <p className={styles["paragraph"]}>
              Inspired by ballet's most beloved turn, this graceful and
              captivating line of diamond jewelry features dazzling marquise and
              round brilliant diamonds.
            </p>
            <button className={styles["animated-button"]}>Discover</button>
          </div>
          <img
            className={styles["hero-img"]}
            src={
              "https://res.cloudinary.com/deztgvefu/image/upload/v1716995568/collections/pirouette_zshews.webp"
            }
            alt={"Img"}
          />
        </div>
      </Link>
      <VerticalLine />
      <Link to="/" className={styles["no-decoration"]}>
        <div className={styles["hero-box"]}>
          <div className={styles["hero-text"]}>
            <p>text</p>
          </div>
          <img
            className={styles["hero-img"]}
            src={
              "https://res.cloudinary.com/deztgvefu/image/upload/v1716995568/collections/diamondloop_hzmacd.webp"
            }
            alt={"Img"}
          />
        </div>
      </Link>
      <VerticalLine />
      <Link to="/" className={styles["no-decoration"]}>
        <div className={styles["hero-box-reverse"]}>
          <div className={styles["hero-text"]}>
            <p>text</p>
          </div>
          <img
            className={styles["hero-img"]}
            src={
              "https://res.cloudinary.com/deztgvefu/image/upload/v1716995568/collections/sunflower_jreu5p.webp"
            }
            alt={"Img"}
          />
        </div>
      </Link>
      <VerticalLine />
      <Link to="/" className={styles["no-decoration"]}>
        <div className={styles["hero-box"]}>
          <div className={styles["hero-text"]}>
            <p>text</p>
          </div>
          <img
            className={styles["hero-img"]}
            src={
              "https://res.cloudinary.com/deztgvefu/image/upload/v1716995569/collections/sparklingcluster_hpovka.webp"
            }
            alt={"Img"}
          />
        </div>
      </Link>
    </section>
  );
};
