import React, { useState, useEffect, useRef } from "react";
import styles from "../CardDetailsForm.module.css";

export const YearDropdown = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("YY");
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
        {selectedYear}
      </button>
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          <li onClick={() => handleSelect("DD")}>YY</li>
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
