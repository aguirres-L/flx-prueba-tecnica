import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Spin, message } from 'antd';

const { Option } = Select;

export default function FormClient  ({ initialValues = {}, onSubmit })  {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async (values) => {
    const updatedClient = { ...initialValues, ...values };
    console.log('Updated client:', updatedClient); // Verificar los datos actualizados
    setIsLoading(true); // Iniciar la carga
    try {
      await onSubmit(updatedClient);
      message.success(initialValues.id ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente'); // Mensaje de éxito específico
      form.resetFields();
      setTimeout(()=>{window.location.reload()},800)
    } catch (error) {
      message.error('Error al crear el usuario'); // Mensaje de error en caso de fallo
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="username"
            label="Usuario"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario' }]}
          >
            <Input placeholder="johndoe" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Por favor ingrese un email válido' }]}
          >
            <Input placeholder="johndoe@domain.com" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input placeholder="John" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="lastname"
            label="Apellido"
            rules={[{ required: true, message: 'Por favor ingrese el apellido' }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="status"
            label="Estado"
            rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
          >
            <Select placeholder="Seleccione un estado">
              <Option value="active">Activo</Option>
              <Option value="inactive">Inactivo</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="age"
            label="Edad"
            rules={[{ required: true, message: 'Por favor ingrese la edad' }]}
          >
            <Input type="number" placeholder='43' />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item style={{ textAlign: 'right' }}>
            { isLoading 
              ? <Spin />
              : <Button type="primary" htmlType="submit">
                  {initialValues.id ? 'Actualizar usuario' : 'Agregar usuario'}
                </Button>
            }
          </Form.Item>
        </Col>
      
      </Row>
    </Form>
  );
};

