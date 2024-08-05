import { useState, useEffect } from "react";

import useProject from "@/hooks/useProject";

// Sesión
import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

import { Modal, Form, Input, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import axios from "axios";

export const CreateProjectModal = ({ openModal, onClose }) => {
  const { logout, usuario, userToken } = useSession();

  const { proyectos, addProject } = useProject();

  const [createProjectName, setCreateProjectName] = useState();
  const [createProjectDescription, setCreateProjectDescription] = useState();
  const [createProjectFile, setCreateProjectFile] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const [fileList, setFileList] = useState();

  useEffect(() => {
    setModalOpen(openModal);
  }, [openModal]);

  const [form] = Form.useForm();

  const closeModal = () => {
    onClose();
    setModalOpen(false);
    form.resetFields();
    setCreateProjectDescription("");
    setCreateProjectName("");
    setFileList([]);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async () => {
    try {
      if (!fileList || !createProjectName || !createProjectDescription) {
        messageApi.open({
          type: "error",
          content:
            "Por favor, completa todos los campos antes de crear un proyecto.",
        });
        return;
      }

      const fileImg = fileList.map((file) => file.originFileObj)[0];

      const formData = new FormData();

      formData.append("imagen", fileImg);
      formData.append("nombre", createProjectName);
      formData.append("descripcion", createProjectDescription);

      const response = await clienteAxios.postForm("/api/projects", formData, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      addProject(response.data.newProject);

      messageApi.open({
        type: "success",
        content: "Se ha creado el proyecto correctamente",
      });

      console.log("Respuesta del backend:", response.data);
      setModalOpen(false);
      setCreateProjectName("");
      setCreateProjectDescription("");

      // obtenerProyectos();
    } catch (error) {
      console.error("Error al enviar los datos", error);
      messageApi.open({
        type: "error",
        content: "Hubo un error al crear el proyecto",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Fallo:", errorInfo);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Crear un nuevo proyecto"
        okButtonProps={{
          style: { backgroundColor: "black", color: "white" },
        }}
        okText="Crear proyecto"
        centered
        open={modalOpen}
        onOk={onFinish}
        onCancel={closeModal}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: false,
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="projectImage"
            rules={[
              {
                required: false,
                message: "Suba una iamgen!",
              },
            ]}
          >
            {/* <ImgCrop
                    rotationSlider
                    modalTitle="Editar imagen"
                    showReset={true}
                    resetText="Resetear"
                    modalClassName={{
                      style: { backgroundColor: "black", color: "white" },
                    }}
                  > */}
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
            >
              {"+ Subir"}
            </Upload>

            {/* </ImgCrop> */}
          </Form.Item>
          <Form.Item
            name="nombreProject"
            rules={[
              {
                required: true,
                message: "Ingresa un nombre",
              },
            ]}
          >
            <Input
              onChange={(e) => setCreateProjectName(e.target.value)}
              value={createProjectName}
              placeholder="Ingresa el nombre del proyecto"
            />
          </Form.Item>
          <Form.Item
            name="descripcion"
            rules={[
              {
                required: false,
                message: "Please input your description!",
              },
            ]}
          >
            <TextArea
              onChange={(e) => setCreateProjectDescription(e.target.value)}
              rows={6}
              value={createProjectDescription}
              placeholder="Ingrese una descripción"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
