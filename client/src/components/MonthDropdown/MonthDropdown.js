import React, { useState, useEffect } from "react";
import styles from "./MonthDropdown.module.css";

export const MonthDropdown = () => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("MM");

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

  return (
    <select className={styles["select-dropdown"]} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
      <option  value="MM" disabled>MM</option>
      {months.map((month) => (
        <option key={month} value={month}>
         <span className={styles["select-option"]}>{month}</span>
        </option>
      ))}
    </select>
  );
};
