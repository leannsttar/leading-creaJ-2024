import React, { useState } from 'react';
import { Badge, Calendar, Popover, Modal } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import locale from 'antd/es/date-picker/locale/es_ES';

const tasks = [
  { id: 1, title: 'Tarea 1', dueDate: '2024-08-10', status: 'warning' },
  { id: 2, title: 'Tarea 2', dueDate: '2024-08-15', status: 'success' },
  { id: 3, title: 'Tarea 3', dueDate: '2024-08-10', status: 'warning' },
  { id: 4, title: 'Tarea 4', dueDate: '2024-08-10', status: 'warning' },
  { id: 5, title: 'Tarea 5', dueDate: '2024-08-10', status: 'warning' },
  { id: 6, title: 'Tarea 6', dueDate: '2024-08-10', status: 'warning' },
];

const getListData = (value) => {
  const formattedDate = value.format('YYYY-MM-DD');
  return tasks.filter(task => task.dueDate === formattedDate);
};

const getMonthData = (value) => {
  const formattedMonth = value.format('YYYY-MM');
  return tasks.filter(task => dayjs(task.dueDate).format('YYYY-MM') === formattedMonth);
};

export const TasksCalendarTab = () => {
  const [value, setValue] = useState(dayjs());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const showMonthTasksModal = (value) => {
    const listData = getMonthData(value);
    setModalContent(
      <div className="p-4 max-h-96 overflow-y-auto">
        {listData.length > 0 ? (
          <ul className="events space-y-2">
            {listData.map((item) => (
              <li key={item.id}>
                <Badge status={item.status} text={item.title} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas para este mes.</p>
        )}
      </div>
    );
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onSelect = (newValue) => {
    setValue(newValue);
  };

  const onPanelChange = (newValue, mode) => {
    setValue(newValue);
  };

  const monthCellRender = (value) => {
    const listData = getMonthData(value);
    return (
      <div
        className="h-full w-full cursor-pointer relative overflow-hidden"
        onClick={() => showMonthTasksModal(value)}
      >
        <div className="p-2 max-h-full overflow-y-auto flex flex-col items-start justify-start box-border">
          {listData.length > 0 && (
            listData.map((item) => (
              <Badge key={item.id} status={item.status} text={item.title} className="block mb-1" />
            ))
          )}
        </div>
      </div>
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <Popover
        content={
          <div className="max-h-24 overflow-y-auto">
            {listData.length > 0 ? (
              listData.map((item) => (
                <Badge key={item.id} status={item.status} text={item.title} className="block mb-1" />
              ))
            ) : (
              <p>No hay tareas para este día.</p>
            )}
          </div>
        }
        title={`Tareas del ${value.format('DD-MM-YYYY')}`}
        trigger="click"
      >
        <div className="h-full w-full">
          {listData.length > 0 && (
            <div className="p-2">
              {listData.map((item) => (
                <Badge key={item.id} status={item.status} text={item.title} className="block mb-1" />
              ))}
            </div>
          )}
        </div>
      </Popover>
    );
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        locale={locale}
      />
      <Modal
        visible={modalVisible}
        title={`Tareas del mes ${value.format('MM-YYYY')}`}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {modalContent}
      </Modal>
    </>
  );
};




















//   // Estado para almacenar el mes actual y el día actual
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentDay, setCurrentDay] = useState(new Date().getDate());

//   // Función para cambiar al mes anterior
//   const goToPreviousMonth = () => {
//     setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
//   };

//   // Función para cambiar al mes siguiente
//   const goToNextMonth = () => {
//     setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between mb-4 font-Poppins">
//         {/* Botón para ir al mes anterior */}
//         <button
//           onClick={goToPreviousMonth}
//           className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
//         >
//           <ChevronLeftIcon className="w-5 h-5" />
//         </button>
//         {/* Nombre del mes */}
//         <div className="text-lg font-medium">{getMonthName(currentMonth)} 2024</div>
//         {/* Botón para ir al mes siguiente */}
//         <button
//           onClick={goToNextMonth}
//           className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
//         >
//           <ChevronRightIcon className="w-5 h-5" />
//         </button>
//       </div>
//       {/* Calendario de días */}
//       <div className="grid grid-cols-7 gap-2 h-full w-full font-Poppins text-base">
//         {/* Cabecera del calendario */}
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
//           <div key={day} className="text-center text-gray-500 dark:text-gray-400 border shadow-lg h-10">
//             {day}
//           </div>
//         ))}
//         {/* Días del mes */}
//         {getDaysInMonth(currentMonth).map((day, index) => (
//           <div key={index} className={getDayClassName(day)}>
//             {day === currentDay ? <span className="text-lg text-white bg-primary rounded shadow-md">{day}</span> : day}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // Función para obtener el nombre del mes según su índice
// const getMonthName = (monthIndex) => {
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
//   return months[monthIndex];
// };

// // Función para obtener los días de un mes específico
// const getDaysInMonth = (monthIndex) => {
//   const monthStart = new Date(2024, monthIndex, 1);
//   const monthEnd = new Date(2024, monthIndex + 1, 0);
//   const days = [];
//   for (let day = 1; day <= monthEnd.getDate(); day++) {
//     days.push(day);
//   }
//   return days;
// };

// // Función para obtener la clase CSS del día
// const getDayClassName = (day) => {
//   return "text-center";
// };

// function ChevronLeftIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m15 18-6-6 6-6" />
//     </svg>
//   );
// }

// function ChevronRightIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m9 18 6-6-6-6" />
//     </svg>
//   );
