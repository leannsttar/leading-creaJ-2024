import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsArrowLeft } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { Modal, message } from "antd";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(nameError){
      messageApi.open({
        type: "error",
        content: "Nombre invalido...",
      });
      return 
    }
    if(emailError){
      messageApi.open({
        type: "error",
        content: "Correo invalido...",
      });
      return 
    }
    if(passwordError){
      messageApi.open({
        type: "error",
        content: "Contraseña invalido...",
      });
      return 
    }
    const response = await fetch("https://leading-creaj-2024.onrender.com/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
    messageApi.open({
      type: "success",
      content: data,
    });

    if (response.ok) {
      //comprobar la respuesta y según eso lo manda
      setModalOpen(true);
    }
  };

  const resendEmail = async () => {
    setLoading(true);

    const response = await fetch(
      "https://leading-creaj-2024.onrender.com/api/users/resendConfirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      }
    );
    console.log(response);

    setLoading(false);

    if (response.ok) {
      messageApi.open({
        type: "success",
        content: "Se ha reenviado el correo de confirmación",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Error al reenviar el correo",
      });
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  const validateName = (name) => {
    if (name.length > 15) {
      return "El nombre no puede tener más de 15 caracteres";
    }
    if (!/^[A-Z]/.test(name)) {
      return "El nombre debe comenzar con una letra mayúscula";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "El correo debe contener un @ válido";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!/[0-9]/.test(password)) {
      return "La contraseña debe contener al menos un número";
    }
    return "";
  };

  
  return (
    <>
      {/* {contextHolder} */}
      <Modal
        title=""
        footer={null}
        okText="Ok"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className=" flex items-center justify-center  bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center flex flex-col items-center">
            <img src="mail.png" className="w-28 h-28 mb-4" alt="mail icon" />
            <h2 className="text-2xl font-semibold mb-4">
              Verificación de Correo
            </h2>
            <p className="mb-4">
              Hemos enviado un enlace de verificación a {email}
            </p>
            <p className="mb-4">
              Haga clic en el enlace para completar el proceso de verificación.
              Es posible que tengas que revisar tu carpeta de spam.
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={resendEmail}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 "
              >
                Reenviar Email
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className=" text-black px-4 py-2 rounded-lg"
              >
                Regresar al Sitio
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex justify-center items-center font-Poppins ">
        <div className="flex h-screen w-screen bg-white shadow-2xl overflow-hidden md:gap-3">
          {/* <div style={{ backgroundImage: "url(https://images.pexels.com/photos/925743/pexels-photo-925743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }} className="bg-contain h-screen w-[60%]"></div> */}
          <img
            className="h-screen hidden md:block md:w-[50%] xl:w-[60%] object-cover "
            src="/signupBg.jpg"
            alt=""
          />

          <div className="w-full flex flex-col md:w-[50%] xl:w-[40%] px-10 md:px-6 lg:px-12 ">
            <div className="flex flex-col justify-center relative bottom-10 h-full">
              <Link
                to={"/"}
                className="mb-12 flex items-center gap-3 cursor-pointer"
              >
                <BsArrowLeft size={25} />
                <p className="text-xl">Regresar</p>
              </Link>
              <h2 className="text-3xl font-semibold mb-2">Crea tu cuenta</h2>
              <p className="text-lg mb-8">
                ¿Ya tienes una cuenta? <span></span>
                <Link className="text-black font-bold underline" to="/login">
                  Iniciar sesión
                </Link>
              </p>
              <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label className="text-lg font-medium" htmlFor="full-name">
                    Nombre
                  </label>
                  <input
                    id="full-name"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa tu nombre"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError(validateName(e.target.value))
                    }}
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm">{nameError}</p>
                  )}
                </div>
                <div>
                  <label className="text-lg font-medium" htmlFor="email">
                    Correo
                  </label>
                  <input
                    id="email"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa un correo"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value),setEmailError(validateEmail(e.target.value))
                    }}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="text-lg font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa una contraseña"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {setPassword(e.target.value),setPasswordError(validatePassword(e.target.value))}}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
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
                  Crear cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
