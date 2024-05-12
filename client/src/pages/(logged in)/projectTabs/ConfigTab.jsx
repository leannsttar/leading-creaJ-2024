import React, { useState } from "react";
import { Table } from "antd";

import projectImage from "../../../assets/projectImage.jpg";
import threeDots from "../../../assets/threeDotsIcon.svg";

import { IoSearchOutline } from "react-icons/io5";

const ButtonConfig = ({ text, onClick, isActive, action }) => {
  return (
    <button
      className={`hover:bg-[#e7e7e7] rounded-lg px-3 py-2 ${
        isActive ? "bg-[#e7e7e7]" : action ? "bg-[#e7e7e7]" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const TableFileRecord = ({ userName, userPicture, email, role }) => {
  return (
    <>
      <tr className="border-t-[1px] border-b-[1px] border-[#ececec]">
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-7 h-7">
                <img
                  src={userPicture}
                  alt="Avatar"
                  className="rounded-full object-cover w-[4rem]"
                />
              </div>
            </div>
            <div>
              <div className="font-semibold">{userName}</div>
            </div>
          </div>
        </td>
        <td className="font-semibold">{email}</td>
        <td className="font-semibold">{role}</td>
        <th>
          <button className="btn btn-ghost btn-xs">
            <img src={threeDots} alt="" />
          </button>
        </th>
      </tr>
    </>
  );
};

export const ConfigTab = () => {
  const [layout, setLayout] = useState("Detalles");

  const dataSource = [
    {
      key: "1",
      picture: (
        <img
          src="https://i.pinimg.com/564x/b0/f9/d1/b0f9d1d460960f112df6c3ce881ab973.jpg"
          className="rounded-full min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem]"
          alt=""
        />
      ),
      name: "Edward Elric",
      age: "edward@fma.com",
      address: "Admin",
      action: <img src={threeDots} />,
    },
    {
      key: "2",
      picture: (
        <img
          src="https://i.pinimg.com/564x/38/75/6e/38756efee3c19c24fd700c920d3dc559.jpg"
          className="rounded-full min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem]"
          alt=""
        />
      ),
      name: "Power",
      age: "power@chain.com",
      address: "Admin",
      action: <img src={threeDots} />,
    },
  ];

  const columns = [
    {
      title: "Foto",
      dataIndex: "picture",
      key: "picture",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Rol",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Acción",
      dataIndex: "action",
      key: "action",
    },
  ];

  const [configInfo, setConfigInfo] = useState({
    nombre: "SAO web project",
    lider: [
      "https://i.pinimg.com/564x/bf/94/d6/bf94d6014c3728c5684543a4d6486847.jpg",
      "James Alyssa",
    ],
    descripcion:
      'El proyecto "SAO web" es una plataforma en línea que combina tecnología de realidad virtual y experiencias inmersivas, ofreciendo una fusión única de juegos de rol, narrativa y socialización en un entorno...',
  });

  const handleChange = (field, value) => {
    setConfigInfo((prevConfigInfo) => ({
      ...prevConfigInfo,
      [field]: value,
    }));
  };

  return (
    <div className="m-5 lg:m-14 pb-16">
      <div className="flex gap-3 mb-1 lg:mb-10">
        <ButtonConfig
          text={"Detalles"}
          onClick={() => setLayout("Detalles")}
          isActive={layout === "Detalles"}
        />
        <ButtonConfig
          text={"Acceso"}
          onClick={() => setLayout("Acceso")}
          isActive={layout === "Acceso"}
        />
      </div>
      <hr className="mb-4 lg:hidden" />
      {layout === "Detalles" ? (
        <div className="lg:mx-[10rem]">
          <div className="space-y-5 mb-3 ">
            <p className="text-2xl font-semibold">Detalles</p>
            <div className="flex flex-col items-center gap-4">
              <img
                src={projectImage}
                alt=""
                className="w-[60%] rounded-lg lg:w-[14rem]"
              />
              <ButtonConfig text={"Cambiar imagen"} action />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Nombre
              </label>
              <input
                value={configInfo.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="py-3 px-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="" className="font-semibold">
                Líder del proyecto
              </label>
              <img
                src={configInfo.lider[0]}
                alt=""
                className="w-8 h-8 object-cover rounded-full absolute top-9 left-2.5"
              />
              <input
                value={configInfo.lider[1]}
                readOnly
                className="py-3 pl-12 pr-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Descripción
              </label>
              <textarea
                value={configInfo.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                className="text-[#00000080] h-[9rem] p-2 border-[1px] border-[#d8d8d8] rounded-lg"
                name=""
                id=""
              ></textarea>
            </div>
            <ButtonConfig
              text={"Guardar cambios"}
              className={"bg-[#f1f1f1]"}
              action
            />
          </div>
        </div>
      ) : (
        <div className="lg:mx-[10rem]">
          <div className="space-y-5 mb-3">
            <p className="text-2xl font-semibold">Acceso</p>
            <div className="relative">
              <IoSearchOutline
                color="#B0BABF"
                size={20}
                className="absolute top-3.5 left-2.5"
              />
              <input
                placeholder="Busca por nombre o correo"
                className="py-3 pl-9 pr-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="overflow-auto">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
          {/**<div className="bg-[#f5f5f5] rounded-2xl">
            <div className="overflow-x-auto ">
              <table className="table">
                
                <thead>
                  <tr className="text-[#525252] text-[1rem]">
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>

                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <TableFileRecord
                    userName={"Edward Elric"}
                    userPicture={
                      "https://i.pinimg.com/564x/a5/8d/2f/a58d2f665c0633f8de9612a80e5c9bf6.jpg"
                    }
                    email={"edward@fma.com"}
                    role={"Admin"}
                  />
                  <TableFileRecord
                    userName={"Edward Elric"}
                    userPicture={
                      "https://i.pinimg.com/564x/a5/8d/2f/a58d2f665c0633f8de9612a80e5c9bf6.jpg"
                    }
                    email={"edward@fma.com"}
                    role={"Admin"}
                  />
                  <TableFileRecord
                    userName={"Edward Elric"}
                    userPicture={
                      "https://i.pinimg.com/564x/a5/8d/2f/a58d2f665c0633f8de9612a80e5c9bf6.jpg"
                    }
                    email={"edward@fma.com"}
                    role={"Admin"}
                  />
                </tbody>
                
                <tfoot>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acción</th>

                  </tr>
                </tfoot>
              </table>
            </div>
                  </div> */}
        </div>
      )}
    </div>
  );
};
