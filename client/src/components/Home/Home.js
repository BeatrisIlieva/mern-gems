import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { VerticalLine } from "../VerticalLine/VerticalLine";

export const Home = () => {
  return (
   
    <section className={styles["hero"]}>
      <Link to="/">
        <div className={styles["hero-box"]}>
          <div className={styles["hero-text"]}>
            <p>text</p>
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
      <VerticalLine/>
      <Link to="/">
        <div className={styles["hero-box-reverse"]}>
          <div className={styles["hero-text"]}>
            <p>text</p>
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
      <VerticalLine/>
      <Link to="/">
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
      <VerticalLine/>
      <Link to="/">
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
      <Link to="/">
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
