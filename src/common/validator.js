import Joi from 'joi';

export const validator = (data, schema, req, res, next) => {
  const error = Joi.validate(data, schema);
  error.error === null ? next() : res.fail(error.error.details[0].message);
};
