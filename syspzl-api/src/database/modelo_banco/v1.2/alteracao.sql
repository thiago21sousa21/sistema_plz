-- Usar o banco de dados correto
USE `lixozerodb`;

-- -----------------------------------------------------
-- PASSO 1: Preparar a tabela `endereco` para a alteração
-- Vamos remover a chave primária e a chave estrangeira existentes para poder reestruturá-la.
-- -----------------------------------------------------

-- Remove a restrição de chave estrangeira temporariamente
ALTER TABLE `lixozerodb`.`endereco` 
DROP FOREIGN KEY `fk_endereco_autuado1`;

-- Remove a chave primária da coluna `autuado_id`
ALTER TABLE `lixozerodb`.`endereco` 
DROP PRIMARY KEY;


-- -----------------------------------------------------
-- PASSO 2: Aplicar o padrão à tabela `endereco`
-- Adicionamos a coluna `id` como PK e garantimos a unicidade da relação 1-para-1.
-- -----------------------------------------------------

-- Adiciona a nova coluna `id` como chave primária, no início da tabela
ALTER TABLE `lixozerodb`.`endereco` 
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;

-- Adiciona uma restrição UNIQUE em `autuado_id` para garantir que um autuado 
-- só possa ter um endereço, mantendo a regra de negócio de 1-para-1.
ALTER TABLE `lixozerodb`.`endereco` 
ADD UNIQUE INDEX `autuado_id_UNIQUE` (`autuado_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- PASSO 3: Recriar a chave estrangeira
-- -----------------------------------------------------

-- Recria a chave estrangeira que agora está semanticamente mais clara
ALTER TABLE `lixozerodb`.`endereco` 
ADD CONSTRAINT `fk_endereco_autuado`
  FOREIGN KEY (`autuado_id`)
  REFERENCES `lixozerodb`.`autuado` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;