const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class CategoryRepo extends BaseRepository {
  constructor() {
    super(db.Category);
    this.model = db.Category;
  }

  async getAllCategories() {
    return this.findAll();
  }

  async createCategory(category) {
    return this.create(category);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async deleteCategory(id, type = "soft") {
    return this.delete(id, type);
  }

  async countCategories(query = {}) {
    return this.count(query);
  }

  async updateCategory(category, id) {
    await this.update(category, { id });
    return this.findOne(id);
  }

  async isCategoryExists(id) {
    return this.count(id);
  }

  async findCategory(customQuery) {
    let query = { include: [] };
    if (customQuery.include) {
      query.include = customQuery.include;
      delete customQuery.include;
    }
    query = customQuery;
    return this.findOne(query);
  }
}

module.exports = new CategoryRepo();
