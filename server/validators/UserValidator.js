const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class UserValidator extends BaseValidator {
  validateCreateUserProfile = (data) => {
    const schema = Joi.object({
      userId: Joi.number().integer().required().messages({
        "number.base": "User ID must be a number",
        "any.required": "User ID is required",
      }),
      contactNo: Joi.string()
        .pattern(/^\d{10,15}$/)
        .messages({
          "string.pattern.base": "Contact number must be 10-15 digits",
        }),
      address: Joi.string().max(255).messages({
        "string.max": "Address must be less than 255 characters",
      }),
      city: Joi.string().max(100).messages({
        "string.max": "City name must be less than 100 characters",
      }),
      profileImage: Joi.string().uri().messages({
        "string.uri": "Profile image must be a valid URL",
      }),
      cnicNo: Joi.string()
        .pattern(/^\d{13}$/)
        .required()
        .messages({
          "string.pattern.base": "CNIC number must be exactly 13 digits",
          "any.required": "CNIC number is required",
        }),
      cnicPicture: Joi.string().uri().required().messages({
        "string.uri": "CNIC picture must be a valid URL",
        "any.required": "CNIC picture is required",
      }),
      isDeleted: Joi.boolean().default(false).messages({
        "boolean.base": "isDeleted must be true or false",
      }),
    });

    return schema.validate(data, { abortEarly: false });
  };
}

module.exports = new UserValidator();
