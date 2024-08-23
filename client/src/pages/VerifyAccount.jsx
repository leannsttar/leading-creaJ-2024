import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import { Loader } from "@/components/Loader";
import { clienteAxios } from "@/config/clienteAxios";

export const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Token de confirmación no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        const response = await clienteAxios.get(
          `/api/users/confirm?token=${token}`
        );
        console.log(response);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(response.data.message);
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Confirmación de Correo</h2>
        <p className="mb-4">{message}</p>
        <Link to={'/login'}>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Ir al Inicio de Sesión
          </button>
        </Link>
      </div>
    </div>
  );
};
