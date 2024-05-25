import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsArrowLeft } from "react-icons/bs";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);

    //comprobar la respuesta y según eso lo manda
    if (response.ok) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center font-Poppins ">
        <div className="flex h-screen w-screen bg-white shadow-2xl overflow-hidden md:gap-3">
          {/* <div style={{ backgroundImage: "url(https://images.pexels.com/photos/925743/pexels-photo-925743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }} className="bg-contain h-screen w-[60%]"></div> */}
          <img
            className="h-screen hidden md:block md:w-[50%] xl:w-[60%] object-cover "
            src="../../public/signupBg.jpg"
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
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium" htmlFor="email">
                    Correo
                  </label>
                  <input
                    id="email"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa un correo"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    className="w-full pl-4 rounded-md outline-none border border-gray h-12 text-lg"
                    placeholder="Ingresa una contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
