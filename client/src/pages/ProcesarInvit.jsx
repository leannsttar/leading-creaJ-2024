import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";
import { Loader } from "@/components/Loader";

export const AcceptInvitation = () => {
  const { usuario } = useSession();
  const { id } = useParams(); // Obtener el ID de la URL
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const acceptInvitation = async () => {
      if (!id) {
        setMessage("ID de invitación no proporcionado.");
        setLoading(false);
        return;
      }

      if (hasAccepted) return;

      try {
        const { status, data } = await clienteAxios.get(
          `/api/projects/acceptInvitation/${id}`
        );

        if (status === 200) {
          setMessage(data.message);
          setHasAccepted(true);
        } else {
          setMessage("Hubo un problema al aceptar la invitación.");
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Error al aceptar la invitación."
        );
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    acceptInvitation();
  }, [id, hasAccepted]);

  if (loading) {
    return <Loader screen />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Aceptar Invitación</h2>
        <p className="mb-4">{message}</p>
        <Link to={usuario ? "/dashboard" : "/login"}>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            {usuario ? "Ir a Proyectos" : "Ir al login"}
          </button>
        </Link>
      </div>
    </div>
  );
};
