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
        />

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsers={getUsers}
            onClose={handleCloseModal}
          />
        </Modal>
      </section>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </section>
  );
}

export default App;
