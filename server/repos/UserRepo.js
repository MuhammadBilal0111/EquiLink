const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");
const { constants } = require("../utils/constant.js");

class UserRepo extends BaseRepository {
  constructor() {
    super(db.User);
    this.model = db.User;
  }

  async createUser(user) {
    return this.create(user);
  }

  async getUsers(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async deleteUser(id, type = "soft") {
    return this.delete(id, type);
  }

  async countUsers(query = {}) {
    return this.count(query);
  }

  async findUserWithInclude(customQuery) {
    return this.findOneWithInclude(customQuery);
  }

  async updateUser(user, id) {
    await this.update(user, { id });
    return this.findOne(id);
  }

  async isUserExists(id) {
    return this.count(id);
  }

  async updateUserPassword(userId, newPassword) {
    return this.update({ password: newPassword }, { id: userId });
  }

  async findUser(customQuery) {
    let query = { include: [] };
    if (customQuery.include) {
      query.include = customQuery.include;
      delete customQuery.include;
    }
    query = customQuery;
    return this.findOne(query);
  }
}

module.exports = new UserRepo();
