CREATE TABLE IF NOT EXISTS cliente (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  telefone VARCHAR(15),
  email VARCHAR(100),
  cep VARCHAR(10),
  bairro VARCHAR(50),
  localidade VARCHAR(50),
  uf VARCHAR(2),
  logradouro VARCHAR(100)
);