import React, { useState, useEffect, useRef } from "react";
import styles from "../CardDetailsForm.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MonthDropdown = () => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("MM *");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const generateMonthOptions = () => {
      const currentMonth = new Date().getMonth() + 1;
      const monthsArray = [];

      for (let month = currentMonth; month <= 12; month++) {
        monthsArray.push(month.toString().padStart(2, "0"));
      }

      setMonths(monthsArray);
    };

    generateMonthOptions();
  }, []);

  const handleSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    console.log(event);
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
      <button
        className={styles["dropdown-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedMonth}
        {isOpen ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            className={styles["chevron-icon"]}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={styles["chevron-icon"]}
          />
        )}
      </button>
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          <li onClick={() => handleSelect("DD")} className={styles["top-li"]}>
            MM
          </li>
          {months.map((month) => (
            <li key={month} onClick={() => handleSelect(month)}>
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
