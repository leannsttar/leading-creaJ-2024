import React, { useState } from "react";

import { useSession } from "@/config/useSession";

import { clienteAxios } from "@/config/clienteAxios";

import { Checkbox, message } from "antd";

import { PiList } from "react-icons/pi";

export const SubTask = ({ name, index, taskId, isChecked, refreshProject }) => {
  const { userToken } = useSession();

  const [check, setCheck] = useState(isChecked);

  const [messageApi, contextHolder] = message.useMessage();

  const onChange = async (e) => {
    try {
      setCheck(!check);
      const formData = new FormData();

      formData.append("taskId", taskId);
      if (check) {
        formData.append("status", "pendiente");
      } else if (!check) {
        formData.append("status", "terminado");
      }

      const response = await clienteAxios.putForm(
        `/api/tasks/updateSubtask`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      refreshProject();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Hubo un error al marcar la tarea",
      });
      console.error("Error al enviar los datos", error);
    }
  };

  return (
    <>
      {contextHolder}
      <div
        key={index}
        className={`flex items-center gap-2 w-full ${
          isChecked ? "true" : "false"
        }`}
      >
        <PiList size={22} className="pb-2" />
        <Checkbox
          onChange={onChange}
          className="text-[1rem] pb-2 border-b-[1px] border-gray-300 w-full mr-6"
          checked={check}
        >
          {name}
        </Checkbox>
      </div>
    </>
  );
};
