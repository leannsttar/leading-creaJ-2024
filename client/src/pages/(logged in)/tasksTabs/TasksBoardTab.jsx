import React from "react";
import TaskCard from "../TaskCard";

export const TasksBoardTab = () => {
  const tasksPorHacer = [
    {
      title: "Tarea 1",
      subtitle: "Hacer algo importante",
      imageSrc: "../../../../public/test-task.png",
      date: "12/05/2024",
      team: "Equipo A",
      comments: 3
    },
     // ponés más acá de este tipo
    ];

  const tasksEnProceso = [
    {
      title: "Tarea 2",
      subtitle: "Revisar documentación",
      imageSrc: "../../../../public/test-task.png",
      date: "13/05/2024",
      team: "Equipo B",
      comments: 2
    },
     // ponés más acá de este tipo
    ];

  const tasksTerminadas = [
    {
      title: "Tarea 3",
      subtitle: "Enviar informe final",
      imageSrc: "../../../../public/test-task.png",
      date: "14/05/2024",
      team: "Equipo C",
      comments: 5
    },
     // ponés más acá de este tipo
    ];

  return (
    <div className="w-full h-full flex overflow-x-auto bg-[#f7f7f7]">
      <div className="flex w-full">
        {/* Columna de "Por hacer" */}
        <div className="w-full lg:w-[30%] p-4">
          <h2 className="text-xl font-bold mb-4">Por hacer</h2>
          {tasksPorHacer.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
        
        {/* Columna de "En proceso" */}
        <div className="w-full lg:w-[30%] p-4">
          <h2 className="text-xl font-bold mb-4">En proceso</h2>
          {tasksEnProceso.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
        
        {/* Columna de "Terminadas" */}
        <div className="w-full lg:w-[30%] p-4">
          <h2 className="text-xl font-bold mb-4">Terminadas</h2>
          {tasksTerminadas.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};
