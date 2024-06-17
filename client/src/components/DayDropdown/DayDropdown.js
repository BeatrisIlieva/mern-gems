import React, { useState, useEffect } from "react";

export const DayDropdown = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const generateDayOptions = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript
      const currentYear = currentDate.getFullYear();

      // Function to get the number of days in the current month
      const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

      const totalDays = daysInMonth(currentMonth, currentYear);
      const daysArray = [];

      for (let day = currentDay; day <= totalDays; day++) {
        daysArray.push(day.toString().padStart(2, "0")); // Add leading zero if needed
      }

      setDays(daysArray);
    };

    generateDayOptions();
  }, []);

  return (
    <select>
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};
