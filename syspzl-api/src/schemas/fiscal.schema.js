import Joi from 'joi';

export const fiscalSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'O ID do fiscal deve ser um número.',
    'any.required': 'O campo "id" é obrigatório.',
  }),
  nome: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'O campo "nome" não pode estar vazio.',
    'any.required': 'O campo "nome" é obrigatório.',
  }),
  // Campos matrícula e código são opcionais
  matricula: Joi.string().trim().max(45).allow(null, '').messages({
    'string.max': 'A matrícula deve ter no máximo {#limit} caracteres.',
  }),
  codigo: Joi.string().trim().max(45).allow(null, '').messages({
    'string.max': 'O código deve ter no máximo {#limit} caracteres.',
  }),
});