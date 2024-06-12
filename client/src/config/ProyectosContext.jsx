import { createContext, useState, useEffect } from "react";
import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const { usuario } = useSession();

  const [proyectos, setProyectos] = useState([]);
  const [fetchInfo, setFetchInfo] = useState(null)

  const obtenerProyectos = async () => {
    try {
      const response = await clienteAxios.get(`/api/projects/${usuario.id}`);

      setProyectos(response.data);
    } catch (error) {
      console.log("Error al obtener los proyectos:", error);
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  const addProject = (newProject) => {
    setProyectos([...proyectos, newProject]);
  };

  const editProject = (updatedProject) => {
    const proyectoIndex = proyectos.findIndex(
      (proyecto) => proyecto.id === updatedProject.id
    );
    if (proyectoIndex !== -1) {
      const nuevosProyectos = [...proyectos];
      nuevosProyectos[proyectoIndex] = updatedProject;
      setProyectos(nuevosProyectos);
    }
  };

  const projectChange = () => {
    obtenerProyectos()
  }


  return (
    <ProyectosContext.Provider value={{ proyectos, addProject, editProject, projectChange, setFetchInfo, fetchInfo }}>
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider, ProyectosContext };
