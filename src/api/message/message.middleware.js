import Joi from 'joi';
import objectid from 'joi-objectid';
import { validator } from '../../common/validator';

Joi.objectId = objectid(Joi);

const messageCreatingSchema = Joi.object().keys({
  username: Joi.string().required(),
  content: Joi.string(),
  type: Joi.string(),
  channel: Joi.objectId().required()
});

export const validateMessageCreating = (req, res, next) => {
  validator(req.body, messageCreatingSchema, req, res, next);
};
