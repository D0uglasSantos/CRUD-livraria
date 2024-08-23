import { db } from "../db.js";

export const getClient = (_, res) => {
  const query = "SELECT * FROM cliente";

  db.query(query, (err, data) => {
    if (err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addClient = (req, res) => {
  const query = "INSERT INTO cliente (`nome`, `telefone`, `email`, `cep`, `bairro`, `localidade`, `uf`, `logradouro`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.telefone,
    req.body.email,
    req.body.cep,
    req.body.bairro,
    req.body.localidade,
    req.body.uf,
    req.body.logradouro,
  ];

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuários criado com sucesso!");
  });
};


export const updateClient = (req, res) => {
  const query = "UPDATE cliente SET `nome` = ?, `telefone` = ?, `email` = ?, `cep` = ?, `bairro` = ?, `localidade` = ?, `uf` = ?, `logradouro` = ? WHERE `id_cliente` = ?";

  const values = [
    req.body.nome,
    req.body.telefone,
    req.body.email,
    req.body.cep,
    req.body.bairro,
    req.body.localidade,
    req.body.uf,
    req.body.logradouro,
  ];

  db.query(query, [...values, req.params.id_cliente], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuários atualizado com sucesso!");
  });
}

export const deleteClient = (req, res) => {
  const query = "DELETE FROM cliente WHERE `id_cliente` =?"
  db.query(query, [req.params.id_cliente], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso!");
  })
}