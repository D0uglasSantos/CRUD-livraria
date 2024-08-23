/* eslint-disable react/prop-types */
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";

const Grid = ({ users, setUsers, setOnEdit, setModalOpen }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
    setModalOpen(true);
  };

  const handleDelete = async (id_cliente) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/${id_cliente}`
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id_cliente !== id_cliente)
      );
      toast.success(response.data);
      setOnEdit(null);
    } catch (error) {
      toast.error(error.response?.data || "Erro ao deletar o usuário");
    }
  };

  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      width: 150,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "cep",
      headerName: "CEP",
      width: 100,
    },
    {
      field: "bairro",
      headerName: "Bairro",
      width: 130,
    },
    {
      field: "localidade",
      headerName: "Localidade",
      width: 130,
    },
    {
      field: "uf",
      headerName: "UF",
      width: 70,
    },
    {
      field: "logradouro",
      headerName: "Logradouro",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      renderCell: (params) => (
        <div className="div-buttons">
          <div className="div-edit" onClick={() => handleEdit(params.row)}>
            <FaEdit className="icon-edit" aria-label="Editar usuário" />
          </div>
          <div
            className="div-delete"
            onClick={() => handleDelete(params.row.id_cliente)}
          >
            <FaTrash className="icon-delete" aria-label="Excluir usuário" />
          </div>
        </div>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id_cliente: user.id_cliente,
    nome: user.nome,
    telefone: user.telefone,
    email: user.email,
    cep: user.cep,
    bairro: user.bairro,
    localidade: user.localidade,
    uf: user.uf,
    logradouro: user.logradouro,
  }));

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id_cliente}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default Grid;
