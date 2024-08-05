import React, { useContext, useState } from "react";
import { Space, Table, Button, Modal, Spin, message } from "antd";
import { UserContext } from "../context/UserContext";
import { deleteUser, updateUser } from "../services/api";
import FormClient from "./FromClient";

export default function TableComponent  ({ filter, searchTerm }) {
  const { users, loading, } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (record) => {
    console.log("Edit user:", record); // Verificar los datos del usuario
    setSelectedClient(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log("Delete user:", record); // Verificar los datos del usuario
    setSelectedClient(record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUser(selectedClient.id);
      message.success('Usuario eliminado exitosamente');
      
      setTimeout(()=>{window.location.reload()},900)
 
    } catch (error) {
      message.error('Error al eliminar el usuario'); // Mensaje de error al eliminar
      console.error("Error deleting user:", error); // Manejar errores al eliminar el usuario
    }
    setIsLoading(false);
    setIsDeleteModalVisible(false);
  };

  const handleFormSubmit = async (client) => {
    try {
      await updateUser(client);
      setIsModalVisible(false);
      
      // agregar la lógica para refrescar la lista de usuarios
    } catch (error) {
      message.error('Error al actualizar el usuario'); // Mensaje de error al actualizar
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}> <Spin /></div>
  }

  // Filtrar usuarios según el estado y el término de búsqueda
  const filteredUsers = users
    .filter((user) => {
      if (filter === "all") return true;
      return user.status === filter;
    })
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      width: "20%",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: "10%",
      
      render: (text) => (
        <Button
          style={{
            borderColor: text === "active" ? "#B7EB8F" : "#f96a6a",
            backgroundColor: text === "active" ? "#F6FFED" : "#FFF1F0",
            color: text === "active" ? "#5CCB27" : "#cf1322",
            fontWeight: "400",
            size:"14px",
            width: "70px"
          }}
        >
          {text === "active" ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      width: "1%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" style={{ fontWeight: "400", size:"20px" }} onClick={() => handleEdit(record)}>Editar</Button>
          <Button type="link" onClick={() => handleDelete(record)}>Eliminar</Button>
        </Space>
      ),
    },
  ];

  const dataSource = filteredUsers.map((user) => ({
    key: user.id,
    ...user,
  }));

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={true}  scroll={{ x: 800 }}  /> {/* tablet */}
      
      <Modal /*  modal edit */
        title="Editar usuario"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <FormClient
          initialValues={selectedClient || {}}
          onSubmit={handleFormSubmit}
        />
      </Modal>
      
      <Modal /* modal delet */
        title="Eliminar usuario" 
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={confirmDelete}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{
          style: {
            backgroundColor: "#ff4d4f",
            borderColor: "#ff4d4f",
            color: "#fff",
          },
        }}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <p style={{ textAlign: "center" }}>
            {`¿Está seguro que quiere eliminar el usuario `}<span style={{ color: "#ff4d4f" }}>{`@${selectedClient?.name}`}</span>{` ?`}
          </p>
        )}
      </Modal>
    </>
  );
};

