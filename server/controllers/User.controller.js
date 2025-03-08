const BaseController = require("./Base.controller.js");
const db = require("../models/index.js");
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

  getUserProfile = async (req, res) => {
    const userId = req.user.id;
    console.log("tuype of useId : ", typeof userId);
    const id = req.params.id;

    const customQuery = {
      where: {},
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "email", "role"],
        },
      ],
    };

    let userProfile;
    if (id && id !== userId) {
      customQuery.where = { userId: id };
      userProfile = await UserProfileRepo.getUserProfiles(customQuery);
    } else {
      customQuery.where = { userId };
      userProfile = await UserProfileRepo.getUserProfiles(customQuery);
    }

    if (!userProfile) {
      return this.errorResponse(res, "User profile not found", 400);
    }

    return this.successResponse(res, userProfile);
  };

  updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const validationResult = validateUpdateProfile(req?.body);

    if (!validationResult) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const updatedUserProfile = await UserProfileRepo.updateUserProfile(
      req.body,
      userId
    );

    if (!updatedUserProfile) {
      return this.errorResponse(res, "Failed to update user profile", 400);
    }

    return this.successResponse(res, updatedUserProfile);
  };
}

module.exports = new UserController();
