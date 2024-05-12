import React, { useState } from "react";

export const TasksCalendarTab = () => {
  // Estado para almacenar el mes actual y el día actual
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  // Función para cambiar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  // Función para cambiar al mes siguiente
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 font-Poppins">
        {/* Botón para ir al mes anterior */}
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        {/* Nombre del mes */}
        <div className="text-lg font-medium">{getMonthName(currentMonth)} 2024</div>
        {/* Botón para ir al mes siguiente */}
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      {/* Calendario de días */}
      <div className="grid grid-cols-7 gap-2 h-full w-full font-Poppins text-base">
        {/* Cabecera del calendario */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center text-gray-500 dark:text-gray-400 border shadow-lg h-10">
            {day}
          </div>
        ))}
        {/* Días del mes */}
        {getDaysInMonth(currentMonth).map((day, index) => (
          <div key={index} className={getDayClassName(day)}>
            {day === currentDay ? <span className="text-lg text-white bg-primary rounded shadow-md">{day}</span> : day}
          </div>
        ))}
      </div>
    </>
  );
};

// Función para obtener el nombre del mes según su índice
const getMonthName = (monthIndex) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthIndex];
};

// Función para obtener los días de un mes específico
const getDaysInMonth = (monthIndex) => {
  const monthStart = new Date(2024, monthIndex, 1);
  const monthEnd = new Date(2024, monthIndex + 1, 0);
  const days = [];
  for (let day = 1; day <= monthEnd.getDate(); day++) {
    days.push(day);
  }
  return days;
};

// Función para obtener la clase CSS del día
const getDayClassName = (day) => {
  return "text-center";
};

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
