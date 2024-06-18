import React, { useState, useEffect, useRef } from "react";
import styles from "../CardDetailsForm.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const YearDropdown = ({
  setExpirationYear,
  setExpirationYearErrorOccurred,
  expirationYearErrorOccurred,
}) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("YY *");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const generateYearOptions = () => {
      const currentYear = new Date().getFullYear();
      const endYear = currentYear + 10;
      const yearsArray = [];

      for (let year = currentYear + 1; year <= endYear; year++) {
        yearsArray.push(year.toString());
      }

      setYears(yearsArray);
    };

    generateYearOptions();
  }, []);

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
    setExpirationYear(year);
    setExpirationYearErrorOccurred(false)
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
    <div
      ref={dropdownRef}
      className={`${styles["dropdown"]} ${
        expirationYearErrorOccurred === true ? styles["error"] : ""
      }`.trim()}
    >
      <button
        className={styles["dropdown-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedYear}
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
      {expirationYearErrorOccurred && (
        <div className={styles["error-message"]}>
          Expiration year is required
        </div>
      )}
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          <li onClick={() => handleSelect("DD")} className={styles["top-li"]}>
            YY
          </li>
          {years.map((year) => (
            <li key={year} onClick={() => handleSelect(year)}>
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
