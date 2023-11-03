import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().required().email({}),
  loggin_type: Joi.string().required(),
  password: Joi.string().required(),
});

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required().alphanum().messages({
    "any.required": 'O campo "name" é obrigatório.',
    "string.min": 'O campo "name" deve ter no mínimo {#limit} caracteres.',
    "string.base": 'O campo "name" deve ser do tipo texto.',
    "string.empty": 'O campo "name" não pode estar vazio.',
  }),
  email: Joi.string().required().email({}),
  loggin_type: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirm_password: Joi.ref("password"),
}).with("password", "confirm_password");
