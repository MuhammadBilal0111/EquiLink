const BaseController = require("./Base.controller.js");
const { validateCreateUserProfile } = require("../validators/UserValidator.js");
const UserProfileRepo = require("../repos/UserProfile.js");

class UserController extends BaseController {
  createUserProfile = async (req, res) => {
    const validationResult = validateCreateUserProfile(req?.body);

    if (!validationResult) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const userProfile = await UserProfileRepo.createUserProfile(req.body);

    if (!userProfile) {
      return this.errorResponse(res, "Failed to create user profile");
    }
    return this.successResponse(res, userProfile);
  };
}

module.exports = new UserController();
