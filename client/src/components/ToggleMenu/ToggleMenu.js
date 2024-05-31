import { useState } from "react";
import formStyles from "../../commonCSS/forms.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../ToggleMenu/ToggleMenu.module.css";

export const ToggleMenu = ({ options, title, subtitle }) => {
  const [isMenuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <div onClick={toggleMenu}>
        <h3 className={styles["title"]}>
          {isMenuOpen ? (
            <>
              {title}
              <span className={styles["arrow"]}>
                <FontAwesomeIcon icon={faAngleUp} />
              </span>
              <>
                <p className={`${styles["sub-title"]} ${styles["slideIn"]}`}>
                  {subtitle}
                </p>
                <ul
                  role="list"
                  className={`${styles["form-list"]} ${styles["slideIn"]}`}
                >
                  {options.map((option, index) => (
                    <li
                      className={styles["form-item-list"]}
                      key={index}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </>
            </>
          ) : (
            <>
              <h3 className={styles["title"]}>
                {title}
                <span className={styles["arrow"]}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </h3>
            </>
          )}
        </h3>
      </div>
    </div>
  );
};
