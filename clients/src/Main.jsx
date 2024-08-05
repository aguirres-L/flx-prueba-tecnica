import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, Select, Space, Modal, Input } from "antd";
import "./Main.css";
import HeaderComponent from "./components/HeaderComponent";
import TableComponent from "./components/TableComponent";
import FormClient from "./components/FromClient";
import { createUser } from "./services/api";

const { Text } = Typography;

export default function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (client) => {
    await createUser(client);
    setIsModalVisible(false);
    // Aquí deberías agregar la lógica para refrescar la lista de usuarios
  };

  const handleChange = (value) => {
    setFilter(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda
  };

  return (
    <div>
      <HeaderComponent />

      <div className="container">
        <UserProvider>
          <div className="title"> {/* title */}
            <Text type="secondary">Usuarios / </Text>
            <Text>Listado de usuarios</Text>
          </div>

          <div className="search-addClient"> {/* add user */}
            <div className="left-side">
    
              <Flex gap="small" vertical>
                <Flex wrap gap="small">
                  <Input
                     suffix={<SearchOutlined />}
                    placeholder="Buscar nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Flex>
              </Flex>
              

              <Space wrap>
                <Select
                  placeholder="Filtrar por estado"
                  style={{ width: 200 }}
                  onChange={handleChange}
                  options={[
                    { value: "all", label: "Todos" },
                    { value: "active", label: "Activo" },
                    { value: "inactive", label: "Inactivo" },
                  ]}
                />
              </Space>
            </div>

            <div className="right-side">
              <Button
                type="primary"
                style={{ backgroundColor: "#1890FF" }}
                onClick={handleAddClient}
              >
                Agregar usuario
              </Button>
            </div>
          </div>

          <div className="table"> {/* component Table */}
            <TableComponent filter={filter} searchTerm={searchTerm} />{" "}
            {/* Pasar el término de búsqueda a TableComponent */}
          </div>
        </UserProvider>

        <Modal /* mmodal add user */
          title="Agregar Cliente"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <FormClient
            initialValues={selectedClient || {}}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      </div>
    </div>
  );
}
