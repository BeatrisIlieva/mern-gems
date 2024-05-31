import { LoginForm } from "./LoginForm/LoginForm";
import styles from "./Login.module.css"
export const Login = () => {
    return (
        <section className={styles["login-box"]}>
            <LoginForm/>
        </section>
    )
}