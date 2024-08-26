import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/config/useSession";

import { BsArrowLeft } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { Modal, message } from "antd";

export const LoginPage = () => {
  const { login } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageType, setMessageType] = useState(""); // Success or error message type
  const [messageContent, setMessageContent] = useState(""); // Message content
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://leading-creaj-2024.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.token) {
      await login(data);
      localStorage.setItem("token", data.token);
      setMessageType("success");
      setMessageContent("Inicio de sesión exitoso");
      navigate("/dashboard");
    } else {
      setMessageType("error");
      setMessageContent(data.error);
    }
  };

  useEffect(() => {
    if (messageType && messageContent) {
      messageApi.open({
        type: messageType,
        content: messageContent,
      });
    }
  }, [messageType, messageContent, messageApi]);

  return (
    <>
      {contextHolder}

      <div className="flex justify-center items-center font-Poppins">
        <div className="flex h-screen w-screen bg-white shadow-2xl overflow-hidden md:gap-3">
          <img
            className="h-screen hidden md:block md:w-[50%] xl:w-[60%] object-cover "
            src="/loginBg.jpg"
            alt=""
          />
          <div className="w-full md:w-[50%] xl:w-[40%] px-10 md:px-6 lg:px-12 ">
            <div className="flex flex-col justify-center  relative bottom-10 h-full">
              <Link
                to={"/"}
                className="mb-12 flex items-center gap-3 cursor-pointer"
              >
                <BsArrowLeft size={25} />
                <p className="text-xl">Regresar</p>
              </Link>
              <h2 className="text-3xl font-semibold mb-2">Hola ¡Bienvenido!</h2>
              <div className="flex gap-2">
                <p className="text-lg mb-8">¿No tienes una cuenta?</p>
                <Link
                  className="text-black text-lg font-bold underline"
                  to="/signup"
                >
                  Crea una
                </Link>
              </div>
              <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label className="text-lg font-medium" htmlFor="email">
                    Correo
                  </label>
                  <input
                    id="email"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa tu correo"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label className="text-lg font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <IoEyeOffOutline
                      size={25}
                      className="absolute top-10 right-5 cursor-pointer"
                      onClick={() => setShowPassword(false)} // Ocultar contraseña
                    />
                  ) : (
                    <IoEyeOutline
                      size={25}
                      className="absolute top-10 right-5 cursor-pointer"
                      onClick={() => setShowPassword(true)} // Mostrar contraseña
                    />
                  )}
                </div>
                <button className="w-full bg-black text-zinc-50 rounded-md text-xl h-12">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
