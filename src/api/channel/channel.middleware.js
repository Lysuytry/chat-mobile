import Joi from 'joi';
import objectid from 'joi-objectid';

Joi.objectId = objectid(Joi);

const createChannelValidator = Joi.object().keys({
  name: Joi.string().required(),
  limit: Joi.number().required()
});

const getListChannelsValidator = Joi.object().keys({
  limit: Joi.number().max(100),
  skip: Joi.number().min(0),
  status: Joi.any().allow('active')
});

// const updateSubjectValidator = Joi.object().keys({
//   name: Joi.string(),
//   teachers: Joi.array()
// });

export const validateCreatedChannel = (req, res, next) => {
  try {
    const { name, limit } = req.body;
    const error = Joi.validate({ name, limit }, createChannelValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error.message);
  }
};

export const validateGetListChannels = (req, res, next) => {
  try {
    const { limit, skip = 0, status } = req.query;
    const error = Joi.validate({limit, skip,status}, getListChannelsValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error.message);
  }
};

// export const validateUpdateSubject = (req, res, next) => {
//   try {
//     const { name, teachers } = req.body;
//     const error = Joi.validate({ name, teachers }, updateSubjectValidator);
//     error.error === null ? next() : res.fail(error.value);
//   } catch (error) {
//     res.fail(error.message);
//   }
// };
