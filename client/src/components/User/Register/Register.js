import { RegisterForm } from "./RegisterForm/RegisterForm";
import { ToggleMenu } from "../../ToggleMenu/ToggleMenu";
import styles from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Register = () => {
  const options = [
    "Is at least eight characters in length",
    "Contains at least one capital letter and one lowercase letter",
    "Contains at least one number",
    "Does not contain spaces",
  ];

  const title = "Password Requirements";

  const subtitle = "Please ensure your password:";
  return (
    <section>
      <h1 className={styles["title"]}>Create an Account</h1>
      <div className={styles["sub-title"]}>
        <h3 className={styles["sub-title-left"]}>Have a ReactGems account?</h3>
        <Link className={styles["link"]}>
          <h3 className={styles["sub-title-right"]}>
            Sign in{" "}
            <span className={styles["arrow"]}>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </h3>
        </Link>
      </div>
      <div className={styles["register-box"]}>
        <div className={styles["form-container"]}>
          <RegisterForm />
        </div>
        <div className={styles["password-requirements-container"]}>
          <div className={styles["image"]}>
            <img
              className={styles["img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1715634166/template_images/herolarged_ny24_plp-2_bs_necklace_jrpvsh.avif"
              }
              alt={"Img"}
            />
          </div>
          <div className={styles["password-requirements"]}>
            <ToggleMenu options={options} title={title} subtitle={subtitle} />
          </div>
        </div>
      </div>
    </section>
  );
};
