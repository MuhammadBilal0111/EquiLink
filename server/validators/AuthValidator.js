const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class UserValidator extends BaseValidator {
  // validation check Done
  validateLoginUser = (user) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().max(20).required().label("Password"),
    });

    return this.validate(schema, user);
  };
}

module.exports = new UserValidator();
