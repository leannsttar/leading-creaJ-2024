import { HiDotsHorizontal } from "react-icons/hi";
import { CiCirclePlus } from "react-icons/ci";

export const TasksListTab = () => {
  return (
    <div className="flex flex-wrap justify-between h-full overflow-auto pt-[6rem] md:pt-[3rem] lg:pt-0 pb-[4rem] bg-[#F7F7F7] font-Poppins">
      {/* Columna "Por hacer" */}
      
      <div className="w-full md:w-1/3 p-4">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-neutral-700">Por hacer</p>
          <div className="flex gap-3">
            <CiCirclePlus size={24} />
            <HiDotsHorizontal size={24} />
          </div>
        </div>
        {/* Contenido de la columna "Por hacer" */}
        <TaskItem title="Update tokens" feedback="Feedback" bug="Bug" />
        {/* Agregar más tareas aquí si es necesario */}
      </div>

      {/* Columna "En proceso" */}
      <div className="w-full md:w-1/3 p-4">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-neutral-700">En proceso</p>
          {/* Agregar iconos o acciones necesarias */}
        </div>
        {/* Contenido de la columna "En proceso" */}
        {/* Agregar tareas en proceso aquí si es necesario */}
      </div>

      {/* Columna "Terminado" */}
      <div className="w-full md:w-1/3 p-4">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-neutral-700">Terminado</p>
          {/* Agregar iconos o acciones necesarias */}
        </div>
        {/* Contenido de la columna "Terminado" */}
        {/* Agregar tareas terminadas aquí si es necesario */}
      </div>
    </div>
  );
};

// Componente reutilizable para representar una tarea
const TaskItem = ({ title, feedback, bug }) => {
  return (
    <div className="flex flex-row bg-[#FFFFFF] items-center justify-between h-12 border-none rounded-md p-3 mb-3">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="font-semibold">{title}</p>
        <div className="flex gap-4">
          {feedback && (
            <p className="bg-[#EBFAE2] text-[#4F9C20] rounded p-1 font-semibold">
              {feedback}
            </p>
          )}
          {bug && (
            <p className="bg-[#FDF2F2] text-[#EC5962] rounded p-1 font-semibold">
              {bug}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
