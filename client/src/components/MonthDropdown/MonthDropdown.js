import React, { useState, useEffect } from 'react';

export const MonthDropdown = () => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('MM');

  useEffect(() => {
    const generateMonthOptions = () => {
      const currentMonth = new Date().getMonth() + 1; 
      const monthsArray = [];

      for (let month = currentMonth; month <= 12; month++) {
        monthsArray.push(month.toString().padStart(2, '0')); /
      }

      setMonths(monthsArray);
    };

    generateMonthOptions();
  }, []);

  return (
    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
      <option value="MM" disabled>MM</option>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

