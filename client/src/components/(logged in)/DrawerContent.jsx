import React from 'react';
import { Drawer, Form, Input, Select, Space, Button, DatePicker, Row, Col } from 'antd';

const { Option } = Select;

const DrawerContent = ({ taskData, onClose }) => {
  return (
    <Drawer
      title={taskData.title}
      width={720}
      onClose={onClose}
      visible={true} 
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        {/* Mostrar la información específica de la tarea dentro del formulario */}
        <p>Tags: {taskData.tags.join(', ')}</p>
        <p>Files: {taskData.files}</p>
        {/* Otros campos según tu estructura de datos */}
      </Form>
    </Drawer>
  );
};

export default DrawerContent;
