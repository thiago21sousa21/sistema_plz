import Joi from 'joi';

export const infracaoSchema = Joi.object({
  evento_id: Joi.number().integer().positive().required(),
  autuado_id: Joi.number().integer().positive().required(),
  fiscal_id: Joi.number().integer().positive().required(),
});