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
}

module.exports = new StartupController();
