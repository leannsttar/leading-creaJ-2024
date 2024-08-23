import { clienteAxios } from "@/config/clienteAxios";
import filePurpleIcon from "../../../assets/filePurpleIcon.svg";
import { TfiDownload } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSession } from "../../../config/useSession.jsx";

const TableFileRecord = ({ fileName, task, fileSize, dateUpload }) => {
  const { userToken } = useSession();

  return (
    <>
      <tr className="border-t-[1px] border-b-[1px] border-[#dfdfdf]">
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-7 h-7">
                <img src={filePurpleIcon} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-semibold">{fileName}</div>
            </div>
          </div>
        </td>
        <td className="underline font-semibold">{task}</td>
        <td className="font-semibold">{fileSize} MB</td>
        <td className="font-semibold">{dateUpload}</td>
        <th>
          <button
            className="btn btn-ghost btn-xs"
            onClick={async () => {
              const getToDownload = await clienteAxios.post(
                "/api/files/uploadfiles",
                {
                  fileName,
                },
                {
                  headers: {
                    Authorization: "Bearer " + userToken,
                  },
                }
              );
              window.open(getToDownload.data.downloadLink, "_blank");
            }}
          >
            <TfiDownload size={18} />
          </button>
        </th>
      </tr>
    </>
  );
};

export const FilesTab = () => {
  const { userToken } = useSession();
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  console.log(files, "waza");
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await clienteAxios.get(
          `api/tasks/files/project/${id}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setFiles(response.data.data);
      } catch (error) {
        console.error("Error al obtener los archivos", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="m-5 lg:m-10 xl:m-20">
      <div className="bg-[#f8f8f8] rounded-2xl">
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Tarea</th>
                <th>Tamaño del archivo</th>
                <th>Remitente del archivo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => {
                return (
                  <TableFileRecord
                    fileName={file.fileName}
                    task={file.task.name}
                    fileSize={file.fileSize}
                    dateUpload={file.author.name}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
