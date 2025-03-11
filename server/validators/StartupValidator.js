const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class StartupValidator extends BaseValidator {
  validateCreateStartup = (data) => {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        "string.base": "Title must be a string",
        "any.required": "Title is required",
      }),
      description: Joi.string().required().messages({
        "string.base": "Description must be a string",
        "any.required": "Description is required",
      }),
      fundingGoal: Joi.number().precision(2).required().messages({
        "number.base": "Funding goal must be a number",
        "any.required": "Funding goal is required",
      }),
      pitchVideo: Joi.string().required().messages({
        "string.base": "Pitch video must be a string",
        "any.required": "Pitch video is required",
      }),
      pitchImages: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Pitch images must be an array of strings",
      }),
      proVersion: Joi.boolean().default(false).messages({
        "boolean.base": "Pro version must be true or false",
      }),
      equity: Joi.string().optional().messages({
        "string.base": "Equity must be a string",
      }),
      projectFile: Joi.string().optional().messages({
        "string.base": "Project file must be a string",
      }),
    });

    return schema.validate(data, { abortEarly: false });
  };

  validateUpdateStartup = (data) => {
    const schema = Joi.object({
      title: Joi.string().optional().messages({
        "string.base": "Title must be a string",
      }),
      description: Joi.string().optional().messages({
        "string.base": "Description must be a string",
      }),
      fundingGoal: Joi.number().precision(2).optional().messages({
        "number.base": "Funding goal must be a number",
      }),
      pitchVideo: Joi.string().optional().messages({
        "string.base": "Pitch video must be a string",
      }),
      pitchImages: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Pitch images must be an array of strings",
      }),
      proVersion: Joi.boolean().optional().messages({
        "boolean.base": "Pro version must be true or false",
      }),
      equity: Joi.string().optional().messages({
        "string.base": "Equity must be a string",
      }),
      projectFile: Joi.string().optional().messages({
        "string.base": "Project file must be a string",
      }),
    });

    return schema.validate(data, { abortEarly: false });
  };
}

module.exports = new StartupValidator();
