import Joi from 'joi';

export const autuadoSchema = Joi.object({
  // ID não é necessário na criação
  id: Joi.number().integer().positive(),

  cpf_cnpj: Joi.string().trim().min(11).max(14).required().messages({
    'string.empty': 'O campo "CPF/CNPJ" é obrigatório.',
    'any.required': 'O campo "CPF/CNPJ" é obrigatório.',
  }),
  autor: Joi.string().trim().min(3).max(100).required().messages({
    'string.empty': 'O campo "autor" (nome/razão social) é obrigatório.',
    'any.required': 'O campo "autor" é obrigatório.',
  }),
  fiscal_id: Joi.number().integer().positive().allow(null),
  
  // O campo 'data' é gerenciado pelo banco, não precisa validar na entrada
});