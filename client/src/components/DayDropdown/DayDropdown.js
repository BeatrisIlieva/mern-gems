import React, { useState, useEffect } from "react";

export const DayDropdown = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("DD");

  useEffect(() => {
    const generateDayOptions = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

      const totalDays = daysInMonth(currentMonth, currentYear);
      const daysArray = [];

      for (let day = currentDay; day <= totalDays; day++) {
        daysArray.push(day.toString().padStart(2, "0"));
      }

      setDays(daysArray);
    };

    generateDayOptions();
  }, []);

  return (
    <select
      value={selectedDay}
      onChange={(e) => setSelectedDay(e.target.value)}
    >
      <option value="DD" disabled>
        DD
      </option>
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};
