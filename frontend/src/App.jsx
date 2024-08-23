import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdPersonAdd } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import axios from "axios";
import "./App.css";

// components
import Form from "./components/Form";
import Grid from "./components/Grid";
import Modal from "./components/Modal";

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleopenModal = () => {
    setOnEdit(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setOnEdit(null); // Limpa a edição ao fechar
    setModalOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/${userToDelete.id_cliente}`
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id_cliente !== userToDelete.id_cliente)
      );
      toast.success(response.data);
      setOnEdit(null);
    } catch (error) {
      toast.error(error.response?.data || "Erro ao deletar o usuário");
    } finally {
      setConfirmDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <section className="main">
      <section className="container">
        <div className="div-top">
          <div className="logo">
            <IoLibrary className="icon" />
            <h2 className="title">
              CRUD <span>Livraria</span>
            </h2>
          </div>
          <div>Search</div>

          <button onClick={handleopenModal} className="btn">
            <IoMdPersonAdd className="icon" />
            <span className="text">Criar Usuário</span>
          </button>
        </div>

        <Grid
          setOnEdit={setOnEdit}
          users={users}
          setUsers={setUsers}
          setModalOpen={setModalOpen}
          setConfirmDeleteModalOpen={setConfirmDeleteModalOpen}
          setUserToDelete={setUserToDelete}
        />

        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsers={getUsers}
            onClose={handleCloseModal}
          />
        </Modal>

        <Modal
          isOpen={confirmDeleteModalOpen}
          onClose={() => setConfirmDeleteModalOpen(false)}
        >
          <div className="confirmation-container">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este usuário?</p>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={handleDeleteUser}>
                Confirmar
              </button>
              <button
                className="btn-cancel"
                onClick={() => setConfirmDeleteModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </section>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </section>
  );
}

export default App;
