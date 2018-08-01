import Joi from 'joi';
import objectid from 'joi-objectid';

Joi.objectId = objectid(Joi);
import {validator} from '../../common/validator';

const userCreatingSchema = Joi.object().keys({
  username: Joi.string().required(),
  channelId: Joi.objectId()
});

const userUpdatingSchema = Joi.object().keys({
  username: Joi.string(),
  channelId: Joi.objectId()
});

export const validateUserCreating = (req, res, next) => {
  console.log(req.body);
  validator(req.body, userCreatingSchema, req, res, next);
};

export const validateUserUpdating = (req, res, next) => {
  validator(req.body, userUpdatingSchema, req, res, next);
};

