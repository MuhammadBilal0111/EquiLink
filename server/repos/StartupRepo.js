const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class StartupRepo extends BaseRepository {
  constructor() {
    super(db.Startup);
    this.model = db.Startup;
  }

  async createStartup(startup) {
    return this.create(startup);
  }

  async getStartups(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async deleteStartup(id, type = "soft") {
    return this.delete(id, type);
  }

  async countStartups(query = {}) {
    return this.count(query);
  }

  async findStartupWithInclude(customQuery) {
    return this.findOneWithInclude(customQuery);
  }

  async updateStartup(startup, id) {
    await this.update(startup, { id });
    return this.findOne(id);
  }

  async isStartupExists(id) {
    return this.count(id);
  }

  async findStartup(customQuery) {
    let query = { include: [] };
    if (customQuery.include) {
      query.include = customQuery.include;
      delete customQuery.include;
    }
    query = customQuery;
    return this.findOne(query);
  }
}

module.exports = new StartupRepo();
