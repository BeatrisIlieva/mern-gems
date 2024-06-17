import React, { useState, useEffect } from "react";

export const MonthDropdown = () => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const generateMonthOptions = () => {
      const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript
      const monthsArray = [];

      for (let month = currentMonth; month <= 12; month++) {
        monthsArray.push(month.toString().padStart(2, "0")); // Add leading zero if needed
      }

      setMonths(monthsArray);
    };

    generateMonthOptions();
  }, []);

  return (
    <select>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};
