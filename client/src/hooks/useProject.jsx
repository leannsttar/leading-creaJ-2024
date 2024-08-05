import { useContext } from "react";
import { ProyectosContext } from "@/config/ProyectosContext";

const useProject = () => {
    return useContext(ProyectosContext)
}

export default useProject;