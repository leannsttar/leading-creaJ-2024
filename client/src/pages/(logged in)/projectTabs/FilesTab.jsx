import filePurpleIcon from "../../../assets/filePurpleIcon.svg";
import { TfiDownload } from "react-icons/tfi";

const TableFileRecord = ({ fileName, task, fileSize, dateUpload }) => {
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
        <td className="font-semibold">{fileSize}</td>
        <td className="font-semibold">{dateUpload}</td>
        <th>
          <button className="btn btn-ghost btn-xs">
            <TfiDownload size={18} />
          </button>
        </th>
      </tr>
    </>
  );
};

export const FilesTab = () => {
  return (
    <div className="m-5 lg:m-10 xl:m-20">
      <div className="bg-[#f5f5f5] rounded-2xl">
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Tarea</th>
                <th>Tamaño del archivo</th>
                <th>Fecha de subida</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TableFileRecord
                fileName={"Website Desing.png"}
                task={"Create userflow website"}
                fileSize={"2.8 MB"}
                dateUpload={"Dec 13, 2022"}
              />
              <TableFileRecord
                fileName={"Website Desing.png"}
                task={"Create userflow website"}
                fileSize={"2.8 MB"}
                dateUpload={"Dec 13, 2022"}
              />
              <TableFileRecord
                fileName={"Website Desing.png"}
                task={"Create userflow website"}
                fileSize={"2.8 MB"}
                dateUpload={"Dec 13, 2022"}
              />
              <TableFileRecord
                fileName={"Website Desing.png"}
                task={"Create userflow website"}
                fileSize={"2.8 MB"}
                dateUpload={"Dec 13, 2022"}
              />
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Archivo</th>
                <th>Tarea</th>
                <th>Tamaño del archivo</th>
                <th>Fecha de subida</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
