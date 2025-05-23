const BaseController = require("./Base.controller.js");
const db = require("../models/index.js");
const { validateCreateUserProfile } = require("../validators/UserValidator.js");
const UserProfileRepo = require("../repos/UserProfile.js");
const UserRepo = require("../repos/UserRepo.js");
const BlobStorageService = require("../services/BlobStorageService.js");
const { where } = require("sequelize");
const StartupRepo = require("../repos/StartupRepo.js");

class UserController extends BaseController {
  
  createUserProfile = async (req, res) => {
    const userId = req.user.id;
    const validationResult = validateCreateUserProfile(req.body);

    if (!validationResult) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const { name, email, ...otherFields } = req.body;

    if (name || email) {
      const user = await UserRepo.updateUser({ name, email }, userId);
      if (!user) {
        return this.errorResponse(res, "Failed to update user", 400);
      }
    }

    let profileImageUrl = null;
    let cnicFrontImageUrl = null;
    let cnicBackImageUrl = null;

    if (req.files?.profileImage) {
      profileImageUrl = await BlobStorageService.uploadFileToBlobStorage(
        `profileImages/${userId}-${Date.now()}-${
          req.files.profileImage[0].originalname
        }`,
        req.files.profileImage[0].buffer,
        req.files.profileImage[0].mimetype
      );
    }

    if (req.files?.cnicFrontImage) {
      cnicFrontImageUrl = await BlobStorageService.uploadFileToBlobStorage(
        `cnicFrontImages/${userId}-${Date.now()}-${
          req.files.cnicFrontImage[0].originalname
        }`,
        req.files.cnicFrontImage[0].buffer,
        req.files.cnicFrontImage[0].mimetype
      );
    }

    if (req.files?.cnicBackImage) {
      cnicBackImageUrl = await BlobStorageService.uploadFileToBlobStorage(
        `cnicBackImages/${userId}-${Date.now()}-${
          req.files.cnicBackImage[0].originalname
        }`,
        req.files.cnicBackImage[0].buffer,
        req.files.cnicBackImage[0].mimetype
      );
    }

    // const existingUserProfile = await UserProfileRepo.getUserProfiles({
    //   where: { userId },
    // });

    // if (existingUserProfile) {
    //   return this.errorResponse(res, "User profile already exists", 400);
    // }

    const userProfile = await UserProfileRepo.createUserProfile({
      ...otherFields,
      userId,
      profileImage: profileImageUrl,
      cnicFrontImage: cnicFrontImageUrl,
      cnicBackImage: cnicBackImageUrl,
    });

    if (!userProfile) {
      return this.errorResponse(res, "Failed to create user profile");
    }

    return this.successResponse(res, userProfile);
  };

  getUserProfile = async (req, res) => {
    const userId = req.user.id;
    console.log("type of useId : ", typeof userId);
    const id = req.params.id;
    console.log("tuype of useId : ", typeof id);
    console.log("id : ", id);
    console.log("userId : ", userId);

    const customQuery = {
      where: {},
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "email", "role","proVersion"],
          where:{
            isDeleted: false,
          }
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

    console.log("custom query : ", customQuery)
    console.log("userProfile : ", JSON.stringify(userProfile, null, 2));

    if (!userProfile) {
      return this.errorResponse(res, "User profile not found", 400);
    }

    return this.successResponse(res,userProfile,"user profile retrieved successfully");
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

  deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return this.validationErrorResponse(res, "User ID is required");
  }

  const user = await UserRepo.findById(id);
  if (!user) {
    return this.validationErrorResponse(res, "User not found");
  }

  const deletedUser = await UserRepo.deleteUser(id);
  if (!deletedUser) {
    return this.errorResponse(res, "Failed to delete user", 400);
  }


  return this.successResponse(res, {}, "User deleted successfully");
};



  getAllUsers = async (req, res) => {
  try {
    const profiles = await UserProfileRepo.getUserProfiles({
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "email", "role", "proVersion"],
          where: { isDeleted: false}
        },
      ],
    });

    if (!profiles || profiles.length === 0) {
      return this.successResponse(res, [], "No user profiles found");
    }

    return this.successResponse(res, profiles, "User profiles retrieved successfully");
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return this.errorResponse(res, "Failed to retrieve user profiles", 500);
  }
};


}

module.exports = new UserController();
