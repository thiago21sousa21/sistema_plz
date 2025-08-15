import Joi from 'joi';

export const enderecoSchema = Joi.object({
  autuado_id: Joi.number().integer().positive().required(),
  estado: Joi.string().trim().max(45).required(),
  cidade: Joi.string().trim().max(45).required(),
  cep: Joi.string().trim().max(45).required(),
  bairro: Joi.string().trim().max(45).allow(null, ''),
  logradouro: Joi.string().trim().max(45).allow(null, ''),
  numero: Joi.string().trim().max(45).allow(null, ''),
  complemento: Joi.string().trim().max(100).allow(null, ''),
});