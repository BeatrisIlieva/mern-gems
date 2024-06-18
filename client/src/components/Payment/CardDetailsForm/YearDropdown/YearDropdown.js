import React, { useState, useEffect, useRef } from "react";
import styles from "../CardDetailsForm.module.css";

export const YearDropdown = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("YY");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const generateYearOptions = () => {
      const currentYear = new Date().getFullYear(); // Get the current year
      const endYear = currentYear + 10; // Set the end year to 10 years from the current year
      const yearsArray = [];

      for (let year = currentYear + 1; year <= endYear; year++) {
        // Start from the next year
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

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
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
