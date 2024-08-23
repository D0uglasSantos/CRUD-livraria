/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import axios from "axios";
import "./style.css";

const Form = ({ getUsers, onEdit, setOnEdit, onClose }) => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cep: "",
    bairro: "",
    localidade: "",
    uf: "",
    logradouro: "",
  });

  useEffect(() => {
    if (onEdit) {
      setFormData({
        nome: onEdit.nome,
        telefone: onEdit.telefone,
        email: onEdit.email,
        cep: onEdit.cep,
        bairro: onEdit.bairro,
        localidade: onEdit.localidade,
        uf: onEdit.uf,
        logradouro: onEdit.logradouro,
      });
    }
  }, [onEdit]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, telefone, email, cep, bairro, localidade, uf, logradouro } =
      formData;

    if (
      !nome ||
      !telefone ||
      !email ||
      !cep ||
      !bairro ||
      !localidade ||
      !uf ||
      !logradouro
    ) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const url = onEdit
        ? `http://localhost:8800/${onEdit.id_cliente}`
        : "http://localhost:8800";
      const method = onEdit ? axios.put : axios.post;

      console.log("Dados enviados:", formData); // Log formData

      const { data } = await method(url, formData);
      console.log("Resposta do servidor:", data); // Log server response

      toast.success(data);

      setFormData({
        nome: "",
        telefone: "",
        email: "",
        cep: "",
        bairro: "",
        localidade: "",
        uf: "",
        logradouro: "",
      });

      setOnEdit(null);
      getUsers(); // Ensure this refetches the updated users
      onClose();
    } catch (error) {
      console.error("Erro ao salvar os dados:", error); // Log error details
      toast.error("Erro ao salvar os dados!");
    }
  };

  const checkCEP = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP não encontrado!");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        logradouro: data.logradouro,
      }));
    } catch {
      toast.error("Erro ao buscar o CEP");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      cep: "",
      bairro: "",
      localidade: "",
      uf: "",
      logradouro: "",
    });
    setOnEdit(null);
    onClose();
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      {[
        { name: "nome", type: "text" },
        { name: "telefone", type: "tel", mask: "(99) 99999-9999" },
        { name: "email", type: "email" },
        { name: "cep", type: "text", mask: "99999-999" },
        { name: "bairro", type: "text" },
        { name: "localidade", type: "text" },
        { name: "uf", type: "text" },
        { name: "logradouro", type: "text" },
      ].map((field, id) => (
        <div key={id} className="inputArea">
          <label className="labelForm">
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
          {field.mask ? (
            <InputMask
              className="input"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={field.name === "cep" ? checkCEP : null}
              mask={field.mask}
              type={field.type}
            />
          ) : (
            <input
              className="input"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={field.name === "cep" ? checkCEP : null}
              type={field.type}
            />
          )}
        </div>
      ))}
      <button className="btn-save" type="submit">
        SALVAR
      </button>
      <button className="btn-cancel" type="button" onClick={handleCancel}>
        CANCELAR
      </button>
    </form>
  );
};

export default Form;
