import Joi from 'joi';
import objectid from 'joi-objectid';
import {validator} from '../../common/validator';

Joi.objectId = objectid(Joi);

const createChannelValidator = Joi.object().keys({
  name: Joi.string().required(),
  limit: Joi.number()
});

export const validateCreatedChannel = (req, res, next) => {
  validator(req.body, createChannelValidator, req, res, next);
};
