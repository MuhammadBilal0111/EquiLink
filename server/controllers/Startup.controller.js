const BaseController = require("./Base.controller.js");
const db = require("../models/index.js");
const { validateCreateStartup } = require("../validators/StartupValidator.js");
const StartupRepo = require("../repos/StartupRepo.js");
const BlobStorageService = require("../services/BlobStorageService.js");

class StartupController extends BaseController {
  createStartup = async (req, res) => {
    const userId = req.user.id;
    console.log("userId", userId);
    const { enterprenuerId, ...otherFields } = req.body;

    const validationResult = validateCreateStartup(req?.body);

    if (!validationResult) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    let pitchImageUrls = [];
    let pitchVideoUrl = null;
    let projectFileUrl = null;

    if (req.files?.pitchImages) {
      pitchImageUrls = await Promise.all(
        req.files.pitchImages.map(async (pitchImage) => {
          return await BlobStorageService.uploadFileToBlobStorage(
            `pitchImages/${userId}-${Date.now()}-${pitchImage.originalname}`,
            pitchImage.buffer,
            pitchImage.mimeType
          );
        })
      );
    }

    if (req.files?.pitchVideo) {
      pitchVideoUrl = await BlobStorageService.uploadFileToBlobStorage(
        `pitchVideo/${userId}-${Date.now()}-${
          req.files.pitchVideo[0].originalname
        }`,
        req.files.pitchVideo[0].buffer,
        req.files.pitchVideo[0].mimeType
      );
    }

    if (req.files?.projectFile) {
      projectFileUrl = await BlobStorageService.uploadFileToBlobStorage(
        `projectFiles/${userId}-${Date.now()}-${
          req.files.projectFile[0].originalname
        }`,
        req.files.projectFile[0].buffer,
        req.files.projectFile[0].mimeType
      );
    }

    const startup = await StartupRepo.createStartup({
      entrepreneurId: userId,
      pitchImages: pitchImageUrls,
      pitchVideo: pitchVideoUrl,
      projectFile: projectFileUrl,
      ...otherFields,
    });

    if (!startup) {
      return this.errorResponse(res, "Failed to create startup", 400);
    }

    return this.successResponse(res, startup, "Startup created successfully");
  };

  getAllStartups = async (req, res) => {
    const customQuery = {
      include: [
        {
          model: db.User,
          as: "entrepreneur",
          attributes: ["id", "name", "role", "email", "proVersion"],

          include: [
            {
              model: db.UserProfile,
              as: "profile",
            },
          ],
        },
      ],
    };

    const startups = await StartupRepo.getStartups(customQuery);

    if (!startups) {
      return this.errorResponse(res, "Failed to fetch startups", 400);
    }

    return this.successResponse(res, startups, "Startups fetched successfully");
  };

  updateStartups = async (req, res) => {
    const {id} = req.body;
    const userId = req.user.id;

    if(!id){
      return this.validationErrorResponse(res, "Startup ID is required");
    }


    const startup = await StartupRepo.findById(id);

    if(!startup){
      return this.validationErrorResponse(res, "Startup not found");
    }

    // if(userId == startup.entrepreneurId){
    //   return this.validationErrorResponse(res, "You are not authorized to update this startup");
    // }

    const updatedStartup = await StartupRepo.updateStartup(
      {
        ...req.body,
        investorId: userId,
      },
      id
    );

    if (!updatedStartup) {
      return this.errorResponse(res, "Failed to update startup", 400);
    }

    return this.successResponse(res, updatedStartup, "Startup updated successfully");
  };

  deleteStartup = async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return this.validationErrorResponse(res, "Startup ID is required");
    }

    const startup = await StartupRepo.findById(id);

    if (!startup) {
      return this.validationErrorResponse(res, "Startup not found");
    }

    const deletedStartup = await StartupRepo.deleteStartup(id);

    if (!deletedStartup) {
      return this.errorResponse(res, "Failed to delete startup", 400);
    }

    return this.successResponse(res, deletedStartup, "Startup deleted successfully");
  };


}

module.exports = new StartupController();
