import Joi from 'joi';

export const eventoSchema = Joi.object({
  // O ID não é obrigatório na criação, pois é AUTO_INCREMENT
  id: Joi.number().integer().positive(),
  
  momento: Joi.date().iso().required().messages({
    'any.required': 'O campo "momento" é obrigatório.',
    'date.format': 'O campo "momento" deve estar no formato ISO (YYYY-MM-DDTHH:mm:ss).',
  }),
  proveniencia: Joi.string().trim().max(45).required().messages({
    'any.required': 'O campo "proveniencia" é obrigatório.',
  }),
  placa: Joi.string().trim().length(7).allow(null, '').messages({
    'string.length': 'A placa deve ter exatamente 7 caracteres.',
  }),
  descricao: Joi.string().trim().max(100).allow(null, ''),
  local: Joi.string().trim().max(100).allow(null, ''),
  
  // Booleans, convertidos de 0/1
  e_infracao: Joi.boolean().required(),
  consultado: Joi.boolean().required(),
  feito: Joi.boolean().required(),
  
  tipo_veiculo: Joi.string().trim().max(100).allow(null, ''),
  
  // Chaves estrangeiras
  fiscal_id: Joi.number().integer().positive().required().messages({
    'any.required': 'O ID do fiscal é obrigatório.',
  }),
  camera_id: Joi.number().integer().positive().allow(null),
});