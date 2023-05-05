import * as Joi from 'joi';

export const JoiValidationsSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  ETHERSCAN_API_URL: Joi.string().required(),
  ETHERSCAN_API_KEY: Joi.string().required(),
});
