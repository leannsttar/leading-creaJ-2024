import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { clienteAxios } from "@/config/clienteAxios";

import { Table } from "antd";

import projectImage from "../../../assets/projectImage.jpg";
import threeDots from "../../../assets/threeDotsIcon.svg";

import { IoSearchOutline } from "react-icons/io5";

const ButtonConfig = ({ text, onClick, isActive, action, textCenter }) => {
  return (
    <button
      className={`hover:bg-[#f0f0f0] rounded-lg px-3 py-2 ${
        textCenter ? "text-center" : "text-left"
      } ${isActive ? "bg-[#f0f0f0]" : action ? "bg-[#f0f0f0]" : ""}`}
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

  const params = useParams();
  const [project, setProject] = useState("loading");

  const [dataSource, setDataSource] = useState([]);
  const [leader, setLeader] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const response = await clienteAxios.get(
          `/api/projects/getProjectConfig/${params.id}`
        );
        
        setProject(response.data);
        setDataSource(
          response.data.users.map((user) => {
            // Find corresponding teamProject entry for the user
            const teamProjectEntry = response.data.team.find(
              (teamMember) => teamMember.user.id === user.id
            );

            // Extract role from teamProject (handle missing role gracefully)
            const role = teamProjectEntry?.role || "Unknown"; // Use 'Unknown' if role is missing
            if (role === 'leader') {
              setLeader(user)
            }
            return {
              key: user.id,
              picture: (
                <img
                  src={`http://localhost:5000/${user.image}`}
                  className="rounded-full min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem]"
                  alt=""
                />
              ),
              name: user.name,
              age: user.email,
              address: role === 'leader' ? 'Líder' : role === 'member' ? 'Miembro' : '',
              action: <img src={threeDots} className="cursor-pointer" />,
            };
          })
        );
      } catch (error) {
        console.log("Error al obtener el proyecto:", error);
      }
    })();
  }, [params.id]);

  const fasdfasdfs = [
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


  return (
    <div className="m-5 lg:my-9 lg:mx-14 xl:my-14 xl:mx-36 pb-16 lg:flex lg:p-4 lg:bg-[#F7F7F7] lg:gap-5 lg:rounded-xl">
      <div className="flex gap-3 lg:gap-1 mb-1 lg:flex-col lg:min-w-[17rem] lg:max-w-[17rem] lg:h-[624px] lg:bg-[#ffffff] lg:p-2 lg:rounded-xl">
        <div className="hidden lg:flex items-center gap-3 m-2">
          <img
            src={`http://localhost:5000/${project.imagen}`}
            alt=""
            className="rounded-md min-w-[2.5rem] min-h-[2.5rem] max-w-[2.5rem] max-h-[2.5rem]"
          />
          <p className="font-semibold">{project.name}</p>
        </div>
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
        <div className="lg:w-full lg:p-10 space-y-3 lg:space-y-5">
          <p className="text-2xl font-semibold lg:text-3xl">Detalles</p>
          <div className="flex justify-center">
            <div className="lg:w-[95%] xl:w-[70%] lg:flex lg:flex-col lg:gap-7">
              <div className="space-y-5 mb-3 ">
                <div className="lg:flex lg:gap-[2rem]">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={`http://localhost:5000/${project.imagen}`}
                      alt=""
                      className="w-[60%] rounded-lg lg:w-[14rem]"
                    />
                    <ButtonConfig text={"Cambiar imagen"} textCenter action />
                  </div>
                  <div className="lg:flex flex-col gap-1 hidden lg:w-full">
                    <label htmlFor="" className="font-semibold">
                      Descripción
                    </label>
                    <textarea
                      value={project.description}
                      
                      className="text-[#00000080] h-full w-full p-2 border-[1px] border-[#d8d8d8] rounded-lg resize-none	"
                      name=""
                      id=""
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold">
                    Nombre
                  </label>
                  <input
                    value={project.name || ''}
                    
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
                    src={`http://localhost:5000/${leader.image || ''}`}
                    alt=""
                    className="w-8 h-8 object-cover rounded-full absolute top-9 left-2.5"
                  />
                  <input
                    value={leader.name || ''}
                    readOnly
                    className="py-3 pl-12 pr-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div className="flex flex-col gap-1 lg:hidden">
                  <label htmlFor="" className="font-semibold">
                    Descripción
                  </label>
                  <textarea
                    value={project.description || ''}
                    
                    className="text-[#00000080] h-[9rem] p-2 border-[1px] border-[#d8d8d8] rounded-lg resize-none	"
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
          </div>
        </div>
      ) : (
        <div className="lg:w-full lg:p-10 space-y-3 lg:space-y-5">
          <p className="text-2xl font-semibold lg:text-3xl">Acceso</p>
          <div className="space-y-5 mb-3">
            <div className="relative">
              <IoSearchOutline
                color="#B0BABF"
                size={20}
                className="absolute top-3.5 left-2.5"
              />
              <input
                placeholder="Busca por nombre o correo"
                className="lg:w-[20rem] py-3 pl-9 pr-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          {project === "loading" && <p>Cargando usuarios...</p>}
          {dataSource.length > 0 && (
            <div className="overflow-auto">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
          )}
          {/* Display message if no users found */}
          {dataSource.length === 0 && project !== "loading" && (
            <p>No se encontraron usuarios para este proyecto.</p>
          )}
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
