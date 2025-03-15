const CategoryRepo = require("../repos/CategoryRepo");
const BaseController = require("./Base.controller");

class CategoryController extends BaseController {
  getAllCategories = async (req, res) => {
    const categories = await CategoryRepo.getAllCategories();

    if (!categories) {
      return this.errorResponse(res, "No categories found", 404);
    }

    return this.successResponse(
      res,
      categories,
      "All Categories retrieved successfully"
    );
  };
}

module.exports = new CategoryController();
