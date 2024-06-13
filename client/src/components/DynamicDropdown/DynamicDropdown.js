import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./DynamicDropdown.module.css";

export const DynamicDropdown = ({
  label,
  options,
  changeHandler,
  submitHandler,
  selection 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles["dropdown"]}>
      <button onClick={toggleDropdown} className={styles["dropdown-toggle"]}>
        <span className={styles["label-text"]}>{label}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={styles["chevron-icon"]}
        />
      </button>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={option.title}
                value={option._id}
                id={option._id}
                onChange={(e) => changeHandler(e, option.entityTitle)}
                // checked={options[option]}
                checked={selection[option.entityTitle]?.includes(option._id)}
              />
              <label htmlFor={option.title}>{option.title}</label>
              <div>{option.count}</div>
            </div>
          ))}
          <button
            onClick={submitHandler}
            className={`${styles["animated-button"]} ${styles["button"]}`}
            type="submit"
            data-testid="submit"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
