import Joi from "joi";

export const todoSchema = Joi.object({
  title: Joi.string().min(3).required().alphanum(),
  content: Joi.string().min(3).required().alphanum(),
  index: Joi.number().integer().positive().required(),
  initial_date: Joi.date(),
  final_date: Joi.date(),
  tag_color: Joi.string(),
});
export const todoUpdateSchema = Joi.object({
  title: Joi.string().min(3).alphanum(),
  content: Joi.string().min(3).alphanum(),
  index: Joi.number().integer().positive(),
  initial_date: Joi.date(),
  final_date: Joi.date(),
  tag_color: Joi.string(),
  concluded: Joi.boolean(),
  concluded_at: Joi.date(),
}).with("concluded", "concluded_at");
