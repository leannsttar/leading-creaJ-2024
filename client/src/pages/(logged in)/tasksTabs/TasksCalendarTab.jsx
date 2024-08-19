import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Calendar, Popover, Modal } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import { useSession } from "@/config/useSession";
import useProject from "@/hooks/useProject";
import { clienteAxios } from "@/config/clienteAxios";

export const TasksCalendarTab = () => {
  const { usuario } = useSession();
  const { proyectos } = useProject();

  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState(dayjs());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const getUserTasks = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/tasks/getUserTasks/${usuario.id}`
      );
      setTasks(response.data);
    } catch (error) {
      console.log("Error al obtener las tareas:", error);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, [usuario.id]);

  const getListData = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    return tasks.filter(
      (task) => dayjs(task.due_date).format("YYYY-MM-DD") === formattedDate
    );
  };

  const getMonthData = (value) => {
    const formattedMonth = value.format("YYYY-MM");
    return tasks.filter(
      (task) => dayjs(task.due_date).format("YYYY-MM") === formattedMonth
    );
  };

  const getProjectImage = (projectId) => {
    const project = proyectos.find((proj) => proj.id === projectId);
    return project ? project.imagen : "";
  };

  const getProjectName = (projectId) => {
    const project = proyectos.find((proj) => proj.id === projectId);
    return project ? project.name : "Sin proyecto";
  };

  const showMonthTasksModal = (value) => {
    const listData = getMonthData(value);

    setModalContent(
      <div className="p-4 max-h-96 overflow-y-auto">
        {listData.length > 0 ? (
          <div className="space-y-2">
            {listData.map((item) => {
              const projectImage = getProjectImage(item.projectId);
              return (
                <Link to={`/dashboard/project/${item.projectId}/board`}>
                  <div
                    key={item.id}
                    className="flex cursor-pointer items-start mb-2 p-2 border rounded-lg shadow-sm bg-white"
                  >
                    {projectImage && (
                      <img
                        src={projectImage}
                        alt="Project"
                        className="w-16 h-16 object-cover rounded-full mr-3"
                      />
                    )}
                    <div className="flex flex-col">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Proyecto:</span>{" "}
                        {getProjectName(item.projectId)}
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Estado:</span>{" "}
                        {item.status === "completed"
                          ? "Completada"
                          : item.status === "in-progress"
                          ? "En Progreso"
                          : "Pendiente"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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

  const cellRender = (value, info) => {
    const listData =
      info?.type === "month" ? getMonthData(value) : getListData(value);

    const cellClass = listData.length > 0 ? "bg-[#2f2f2f] text-white bg-opacity-0 md:bg-opacity-100" : "";
    if (info?.type === "month") {
      return (
        <div
          className="h-full w-full cursor-pointer relative overflow-hidden"
          onClick={() => showMonthTasksModal(value)}
        >
          <div
            className={`p-2 max-h-full overflow-y-auto flex flex-col items-start justify-start box-border rounded-md`}
          >
            {listData.length > 0 && (
              <div className="space-y-1 w-full hidden md:block">
                {listData.map((item) => (
                  <p
                    key={item.id}
                    className={`font-semibold p-1 rounded-lg ${cellClass}`}
                  >
                    • {item.name}
                  </p>
                ))}
              </div>
            )}
            <div className={`md:hidden flex items-center justify-center h-full w-full ${cellClass}`}>
              {listData.length > 0 && (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                  {listData.length}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Popover
        content={
          <div className="p-4">
            {listData.length > 0 ? (
              listData.map((item) => {
                const projectImage = getProjectImage(item.projectId);
                return (
                  <Link to={`/dashboard/project/${item.projectId}/board`}>
                    <div
                      key={item.id}
                      className="flex cursor-pointer items-start mb-2 border rounded-lg shadow-sm p-2"
                    >
                      {projectImage && (
                        <img
                          src={projectImage}
                          alt="Project"
                          className="w-12 h-12 object-cover rounded-full ml-1 my-auto mr-3"
                        />
                      )}
                      <div className="flex flex-col mr-2 space-y-0.5">
                        <p className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[12rem] md:max-w-[20rem]">
                          • {item.name}
                        </p>
                        <p className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[12rem] md:max-w-[20rem]">
                          {item.description}
                        </p>
                        <p className="text-xs">
                          <span className="font-semibold">Proyecto:</span>{" "}
                          {getProjectName(item.projectId)}
                        </p>
                        <p className="text-xs">
                          <span className="font-semibold">Estado:</span>{" "}
                          {item.status === "completed"
                            ? "Completada"
                            : item.status === "in-progress"
                            ? "En Progreso"
                            : "Pendiente"}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No hay tareas para este día.</p>
            )}
          </div>
        }
        title={`Tareas del ${value.format("YYYY-MM-DD")}`}
        trigger="click"
        overlayClassName="popover-task"
      >
        <div className={`h-full w-full p-2 rounded-lg `}>
          {listData.length > 0 && (
            <div className={` rounded-sm space-y-1 hidden lg:block`}>
              {listData.map((item) => (
                <p
                  key={item.id}
                  className={`font-semibold p-1 rounded-lg ${cellClass}`}
                >
                  • {item.name}
                </p>
              ))}
            </div>
          )}
          <div className={`lg:hidden flex items-center justify-center h-full w-full bg-[#FEE4CB] bg-opacity-0 lg:bg-opacity-100`}>
              {listData.length > 0 && (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                  {listData.length}
                </div>
              )}
            </div>
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
        cellRender={cellRender}
        locale={locale}
      />
      <Modal
        open={modalVisible}
        title={`Tareas del mes ${value.format("MM-YYYY")}`}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        bodyStyle={{ padding: 0 }}
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
