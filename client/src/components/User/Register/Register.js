import { RegisterForm } from "./RegisterForm/RegisterForm";
import styles from "./Register.module.css";

export const Register = () => {
  return (
    <section >
        <h1 className={styles["title"]}>Create an Account</h1>
        <div className={styles["register-box"]}>
        
      <div className={styles["form-container"]}> 
        <RegisterForm />
      </div>
      <div className={styles["image-container"]}>
        <img
          className={styles["img"]}
          src={
            "https://res.cloudinary.com/deztgvefu/image/upload/v1715634166/template_images/herolarged_ny24_plp-2_bs_necklace_jrpvsh.avif"
          }
          alt={"Img"}
        />
      </div>
      </div>
    </section>
  );
};
