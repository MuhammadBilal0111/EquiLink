const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class UserProfileRepo extends BaseRepository {
  constructor() {
    super(db.UserProfile);
    this.model = db.UserProfile;
  }

  async createUserProfile(userProfile) {
    return this.create(userProfile);
  }

  async getUserProfiles(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async findUserProfileById(id) {
    return this.findOne({ id });
  }

  async deleteUserProfile(id, type = "soft") {
    return this.delete(id, type);
  }

  async countUserProfiles(query = {}) {
    return this.count(query);
  }

  async updateUserProfile(userProfile, id) {
    await this.update(userProfile, { id });
    return this.findOne(id);
  }

  async isUserProfileExists(id) {
    return this.count(id);
  }

  async findUserProfile(customQuery) {
    let query = { include: [] };
    if (customQuery.include) {
      query.include = customQuery.include;
      delete customQuery.include;
    }
    query = customQuery;
    return this.findOne(query);
  }
}

module.exports = new UserProfileRepo();
