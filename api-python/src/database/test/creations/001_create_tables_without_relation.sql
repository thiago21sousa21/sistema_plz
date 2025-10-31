CREATE SCHEMA IF NOT EXISTS lixozerodb_teste;

USE lixozerodb_teste;

CREATE TABLE IF NOT EXISTS fiscal(
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  matricula VARCHAR(45) NULL DEFAULT NULL,
  codigo VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS autuado (
  id INT NOT NULL AUTO_INCREMENT,
  fiscal_id INT NULL DEFAULT NULL,
  momento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  cpf_cnpj VARCHAR(14) NOT NULL UNIQUE,
  autor VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS camera (
  id INT NOT NULL,
  bairro VARCHAR(45) NOT NULL,
  zona VARCHAR(45) NOT NULL,
  referencia_local VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS endereco(
  id INT PRIMARY KEY AUTO_INCREMENT,
  autuado_id INT NOT NULL,
  estado VARCHAR(45) NOT NULL,
  cidade VARCHAR(45) NOT NULL,
  cep VARCHAR(45) NOT NULL,
  bairro VARCHAR(45) NULL DEFAULT NULL,
  logradouro VARCHAR(45) NULL DEFAULT NULL,
  numero VARCHAR(45) NULL DEFAULT NULL,
  complemento VARCHAR(100) NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS evento (
  id INT NOT NULL AUTO_INCREMENT,
  momento DATETIME NOT NULL,
  proveniencia VARCHAR(45) NOT NULL,
  placa CHAR(7) NULL DEFAULT NULL,
  referencia_local VARCHAR(100) NULL DEFAULT NULL,
  coordenada POINT NULL DEFAULT NULL,
  e_infracao TINYINT NULL DEFAULT '0',
  consultado TINYINT NULL DEFAULT '0',
  descricao_veiculo VARCHAR(100) NULL DEFAULT NULL,
  descricao_evento  VARCHAR(255) NULL DEFAULT NULL,
  fiscal_id INT NOT NULL,
  camera_id INT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS infracao (
  id INT NOT NULL AUTO_INCREMENT,
  fiscal_id INT NOT NULL,
  evento_id INT NOT NULL,
  autuado_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS veiculo (
  id INT NOT NULL AUTO_INCREMENT,
  autuado_id INT NOT NULL,
  placa VARCHAR(45) NOT NULL,
  marca_modelo VARCHAR(100) NULL DEFAULT NULL,
  cor VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE autuado
  ADD CONSTRAINT FK_autuado_fiscal_id_REF_fiscal_id
  FOREIGN KEY (fiscal_id) REFERENCES fiscal(id);

ALTER TABLE veiculo
  ADD CONSTRAINT FK_veiculo_autuado_id_REF_autuado_id
  FOREIGN KEY (autuado_id) REFERENCES autuado(id);

ALTER TABLE endereco
  ADD CONSTRAINT FK_endereco_autuado_id_REF_autuado_id
  FOREIGN KEY (autuado_id) REFERENCES autuado(id);

ALTER TABLE evento
  ADD CONSTRAINT FK_evento_fiscal_id_REF_fiscal_id
    FOREIGN KEY (fiscal_id) REFERENCES fiscal(id),
  ADD CONSTRAINT FK_evento_camera_id_REF_camera_id
    FOREIGN KEY (camera_id) REFERENCES camera(id);
  
ALTER TABLE infracao
  ADD CONSTRAINT FK_infracao_fiscal_id_REF_fiscal_id
    FOREIGN KEY (fiscal_id) REFERENCES fiscal(id),
  ADD CONSTRAINT FK_infracao_evento_id_REF_evento_id
    FOREIGN KEY (evento_id) REFERENCES evento(id),
  ADD CONSTRAINT FK_infracao_autuado_id_REF_autuado_id
    FOREIGN KEY (autuado_id) REFERENCES autuado(id);
        