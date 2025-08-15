-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lixozerodb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lixozerodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lixozerodb` DEFAULT CHARACTER SET utf8 ;
USE `lixozerodb` ;

-- -----------------------------------------------------
-- Table `lixozerodb`.`fiscal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`fiscal` (
  `id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(45) NULL,
  `codigo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lixozerodb`.`camera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`camera` (
  `id` INT NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `zona` VARCHAR(45) NOT NULL,
  `local` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lixozerodb`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`evento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `momento` DATETIME NOT NULL,
  `proveniencia` VARCHAR(45) NOT NULL,
  `placa` CHAR(7) NULL,
  `descricao` VARCHAR(100) NULL,
  `local` VARCHAR(100) NULL,
  `coordenada` POINT NULL,
  `e_infracao` TINYINT NULL DEFAULT 1,
  `consultado` TINYINT NULL DEFAULT 0,
  `feito` TINYINT NULL DEFAULT 0,
  `tipo_veiculo` VARCHAR(100) NULL,
  `fiscal_id` INT NOT NULL,
  `camera_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_evento_fiscal_idx` (`fiscal_id` ASC) VISIBLE,
  INDEX `fk_evento_camera1_idx` (`camera_id` ASC) VISIBLE,
  CONSTRAINT `fk_evento_fiscal`
    FOREIGN KEY (`fiscal_id`)
    REFERENCES `lixozerodb`.`fiscal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_evento_camera1`
    FOREIGN KEY (`camera_id`)
    REFERENCES `lixozerodb`.`camera` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lixozerodb`.`autuado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`autuado` (
  `fiscal_id` INT NULL,
  `data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cpf_cnpj` VARCHAR(14) NOT NULL,
  `autor` VARCHAR(100) NOT NULL,
  INDEX `fk_infrator_fiscal1_idx` (`fiscal_id` ASC) VISIBLE,
  PRIMARY KEY (`cpf_cnpj`),
  CONSTRAINT `fk_infrator_fiscal1`
    FOREIGN KEY (`fiscal_id`)
    REFERENCES `lixozerodb`.`fiscal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lixozerodb`.`infracao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`infracao` (
  `id` INT NOT NULL,
  `fiscal_id` INT NOT NULL,
  `evento_id` INT NOT NULL,
  `autuado_cpf_cnpj` VARCHAR(14) NOT NULL,
  PRIMARY KEY (`id`, `fiscal_id`),
  INDEX `fk_infracao_fiscal1_idx` (`fiscal_id` ASC) VISIBLE,
  INDEX `fk_infracao_evento1_idx` (`evento_id` ASC) VISIBLE,
  INDEX `fk_infracao_autuado1_idx` (`autuado_cpf_cnpj` ASC) VISIBLE,
  CONSTRAINT `fk_infracao_fiscal1`
    FOREIGN KEY (`fiscal_id`)
    REFERENCES `lixozerodb`.`fiscal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_infracao_evento1`
    FOREIGN KEY (`evento_id`)
    REFERENCES `lixozerodb`.`evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_infracao_autuado1`
    FOREIGN KEY (`autuado_cpf_cnpj`)
    REFERENCES `lixozerodb`.`autuado` (`cpf_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lixozerodb`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`endereco` (
  `autuado_cpf_cnpj` VARCHAR(14) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NULL,
  `logradouro` VARCHAR(45) NULL,
  `numero` VARCHAR(45) NULL,
  `complemento` VARCHAR(100) NULL,
  PRIMARY KEY (`autuado_cpf_cnpj`),
  INDEX `fk_endereco_autuado1_idx` (`autuado_cpf_cnpj` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_autuado1`
    FOREIGN KEY (`autuado_cpf_cnpj`)
    REFERENCES `lixozerodb`.`autuado` (`cpf_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lixozerodb`.`veiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lixozerodb`.`veiculo` (
  `autuado_cpf_cnpj` VARCHAR(14) NOT NULL,
  `placa` VARCHAR(45) NULL,
  `marca_modelo` VARCHAR(100) NULL,
  INDEX `fk_veiculo_autuado1_idx` (`autuado_cpf_cnpj` ASC) VISIBLE,
  CONSTRAINT `fk_veiculo_autuado1`
    FOREIGN KEY (`autuado_cpf_cnpj`)
    REFERENCES `lixozerodb`.`autuado` (`cpf_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
