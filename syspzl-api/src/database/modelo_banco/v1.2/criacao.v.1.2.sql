-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema lixozerodb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lixozerodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lixozerodb` DEFAULT CHARACTER SET utf8mb3 ;
USE `lixozerodb` ;

-- -----------------------------------------------------
-- Table `lixozerodb`.`fiscal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`fiscal` (
  `id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(45) NULL DEFAULT NULL,
  `codigo` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lixozerodb`.`autuado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`autuado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fiscal_id` INT NULL DEFAULT NULL,
  `data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cpf_cnpj` VARCHAR(14) NOT NULL,
  `autor` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_cnpj_UNIQUE` (`cpf_cnpj` ASC) VISIBLE,
  INDEX `fk_infrator_fiscal1_idx` (`fiscal_id` ASC) VISIBLE,
  CONSTRAINT `fk_infrator_fiscal1`
    FOREIGN KEY (`fiscal_id`)
    REFERENCES `lixozerodb`.`fiscal` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lixozerodb`.`camera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`camera` (
  `id` INT NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `zona` VARCHAR(45) NOT NULL,
  `local` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lixozerodb`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `autuado_id` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NULL DEFAULT NULL,
  `logradouro` VARCHAR(45) NULL DEFAULT NULL,
  `numero` VARCHAR(45) NULL DEFAULT NULL,
  `complemento` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `autuado_id_UNIQUE` (`autuado_id` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_autuado`
    FOREIGN KEY (`autuado_id`)
    REFERENCES `lixozerodb`.`autuado` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lixozerodb`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`evento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `momento` DATETIME NOT NULL,
  `proveniencia` VARCHAR(45) NOT NULL,
  `placa` CHAR(7) NULL DEFAULT NULL,
  `descricao` VARCHAR(100) NULL DEFAULT NULL,
  `local` VARCHAR(100) NULL DEFAULT NULL,
  `coordenada` POINT NULL DEFAULT NULL,
  `e_infracao` TINYINT NULL DEFAULT '1',
  `consultado` TINYINT NULL DEFAULT '0',
  `feito` TINYINT NULL DEFAULT '0',
  `tipo_veiculo` VARCHAR(100) NULL DEFAULT NULL,
  `fiscal_id` INT NOT NULL,
  `camera_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_evento_fiscal_idx` (`fiscal_id` ASC) VISIBLE,
  INDEX `fk_evento_camera1_idx` (`camera_id` ASC) VISIBLE,
  INDEX `idx_placa` (`placa` ASC) VISIBLE,
  CONSTRAINT `fk_evento_camera1`
    FOREIGN KEY (`camera_id`)
    REFERENCES `lixozerodb`.`camera` (`id`),
  CONSTRAINT `fk_evento_fiscal`
    FOREIGN KEY (`fiscal_id`)
    REFERENCES `lixozerodb`.`fiscal` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lixozerodb`.`infracao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`infracao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fiscal_id` INT NOT NULL,
  `evento_id` INT NOT NULL,
  `autuado_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_infracao_fiscal1_idx` (`fiscal_id` ASC) VISIBLE,
  INDEX `fk_infracao_evento1_idx` (`evento_id` ASC) VISIBLE,
  INDEX `fk_infracao_autuado1_idx` (`autuado_id` ASC) VISIBLE,
  CONSTRAINT `fk_infracao_autuado1`
    FOREIGN KEY (`autuado_id`)
    REFERENCES `lixozerodb`.`autuado` (`id`),
  CONSTRAINT `fk_infracao_evento1`
    FOREIGN KEY (`evento_id`)
    REFERENCES `lixozerodb`.`evento` (`id`),
  CONSTRAINT `fk_infracao_fiscal1`
    FOREIGN KEY (`fiscal_id`)
    REFERENCES `lixozerodb`.`fiscal` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `lixozerodb`.`veiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`veiculo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `autuado_id` INT NOT NULL,
  `placa` VARCHAR(45) NOT NULL,
  `marca_modelo` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `placa_UNIQUE` (`placa` ASC) VISIBLE,
  INDEX `fk_veiculo_autuado1_idx` (`autuado_id` ASC) VISIBLE,
  CONSTRAINT `fk_veiculo_autuado1`
    FOREIGN KEY (`autuado_id`)
    REFERENCES `lixozerodb`.`autuado` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
