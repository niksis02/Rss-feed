import joi from '@hapi/joi';

export const registerDto = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  repeatPassword: joi.string().equal(joi.ref('password')).min(6).required(),
});

export const loginDto = joi.object({
  username: joi.string().required(),
  password: joi.string().required().min(6),
});
