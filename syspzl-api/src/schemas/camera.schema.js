import Joi from 'joi';

// Schema de validação para a criação de uma nova câmera,
// baseado na estrutura da tabela do banco de dados.
export const cameraSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'O ID da câmera deve ser um número.',
    'number.integer': 'O ID da câmera deve ser um número inteiro.',
    'number.positive': 'O ID da câmera deve ser um número positivo.',
    'any.required': 'O campo "id" é obrigatório.',
  }),

  bairro: Joi.string().trim().min(3).max(45).required().messages({
    'string.base': 'O campo "bairro" deve ser um texto.',
    'string.empty': 'O campo "bairro" não pode estar vazio.',
    'string.min': 'O campo "bairro" deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O campo "bairro" deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo "bairro" é obrigatório.',
  }),

  zona: Joi.string().trim().min(2).max(45).required().messages({
    'string.base': 'O campo "zona" deve ser um texto.',
    'string.empty': 'O campo "zona" não pode estar vazio.',
    'string.min': 'O campo "zona" deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O campo "zona" deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo "zona" é obrigatório.',
  }),

  local: Joi.string().trim().min(5).max(100).required().messages({
    'string.base': 'O campo "local" deve ser um texto.',
    'string.empty': 'O campo "local" não pode estar vazio.',
    'string.min': 'O campo "local" deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O campo "local" deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo "local" é obrigatório.',
  }),
});