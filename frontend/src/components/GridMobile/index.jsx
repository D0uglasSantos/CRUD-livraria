/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";
import "./style.css";

const GridMobile = ({
  users,
  setUsers,
  setOnEdit,
  setModalOpen,
  setConfirmDeleteModalOpen,
  setUserToDelete,
}) => {
  const handleEdit = (item) => {
    setOnEdit(item);
    setModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setUserToDelete(item);
    setConfirmDeleteModalOpen(true);
  };

  return (
    <div className="main-cards">
      {users.map((user) => (
        <div className="cards-users" key={user.id_cliente}>
          <div className="header-card">
            <h3 className="user-name">{user.nome}</h3>
            <div className="div-icons">
              <div className="div-edit" onClick={() => handleEdit(user)}>
                <FaEdit className="icon-edit" aria-label="Editar usuário" />
              </div>
              <div
                className="div-delete"
                onClick={() => handleDeleteClick(user)}
              >
                <FaTrash className="icon-delete" aria-label="Excluir usuário" />
              </div>
            </div>
          </div>
          <p className="infos">
            Telefone:
            <span>{user.telefone}</span>
          </p>
          <p className="infos">
            Email:
            <span>{user.email}</span>
          </p>
          <p className="infos">
            CEP:
            <span>{user.cep}</span>
          </p>
          <p className="infos">
            Bairro:
            <span>{user.bairro}</span>
          </p>
          <p className="infos">
            Localidade:
            <span>{user.localidade}</span>
          </p>
          <p className="infos">
            UF:
            <span>{user.uf}</span>
          </p>
          <p className="infos">
            Logradouro:
            <span>{user.logradouro}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default GridMobile;
