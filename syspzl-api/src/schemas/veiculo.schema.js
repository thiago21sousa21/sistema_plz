import Joi from 'joi';

export const veiculoSchema = Joi.object({
  autuado_id: Joi.number().integer().positive().required(),
  placa: Joi.string().trim().max(45).required(),
  marca_modelo: Joi.string().trim().max(100).allow(null, ''),
});