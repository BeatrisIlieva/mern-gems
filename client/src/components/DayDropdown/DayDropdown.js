// import React, { useState, useEffect } from "react";

// export const DayDropdown = () => {
//   const [days, setDays] = useState([]);
//   const [selectedDay, setSelectedDay] = useState("DD");

//   useEffect(() => {
//     const generateDayOptions = () => {
//       const currentDate = new Date();
//       const currentDay = currentDate.getDate();
//       const currentMonth = currentDate.getMonth() + 1;
//       const currentYear = currentDate.getFullYear();
//       const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

//       const totalDays = daysInMonth(currentMonth, currentYear);
//       const daysArray = [];

//       for (let day = currentDay; day <= totalDays; day++) {
//         daysArray.push(day.toString().padStart(2, "0"));
//       }

//       setDays(daysArray);
//     };

//     generateDayOptions();
//   }, []);

//   return (
//     <select
//       value={selectedDay}
//       onChange={(e) => setSelectedDay(e.target.value)}
//     >
//       <option value="DD" disabled>
//         DD
//       </option>
//       {days.map((day) => (
//         <option key={day} value={day}>
//           {day}
//         </option>
//       ))}
//     </select>
//   );
// };


import React, { useState, useEffect, useRef } from "react";
import styles from "./DayDropdown.module.css"

export const DayDropdown = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("DD");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleSelect = (day) => {
    setSelectedDay(day);
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
        {selectedDay}
      </button>
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          <li onClick={() => handleSelect("DD")}>DD</li>
          {days.map((day) => (
            <li key={day} onClick={() => handleSelect(day)}>
              {day}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
