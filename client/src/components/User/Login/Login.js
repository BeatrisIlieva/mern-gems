import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm/LoginForm";
import styles from "./Login.module.css";
import formStyles from "../../../commonCSS/forms.module.css";
export const Login = () => {
  return (
    <section>
      <div className={styles["image"]}>
        <img
          className={styles["img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1715634166/template_images/herolarged_ny24_plp-2_bs_necklace_jrpvsh.avif"
          }
          alt={"Img"}
        />
      </div>
      <div className={styles["login-box"]}>
        <div className={styles["login-container"]}>
          <h2 className={styles["title"]}>Sign In</h2>
          <h3 className={styles["sub-title"]}>
            Please Sign In to your ReactGems account
          </h3>
          <LoginForm />
        </div>
        <div className={styles["form-vertical-line"]}></div>
        <div className={styles["register-container"]}>
          <h2 className={styles["title"]}>New Customers</h2>
          <h3 className={styles["sub-title"]}>
            Register with React Gems for the following benefits:
          </h3>
          <ul role="list" className={styles["list"]}>
            <li className={styles["item"]}>Faster checkout</li>
            <li className={styles["item"]}>View order history</li>
            <li className={styles["item"]}>
              Enjoy the convenience of saving your wishlist permanently
            </li>
          </ul>
          <Link to="/user/register">
            <button
              className={`${formStyles["animated-button"]} ${styles["register-button"]} `}
              type="submit"
              data-testid="submit"
            >
              Create an Account
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
