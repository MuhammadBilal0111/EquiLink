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

  // async findUser(query){
  //   return this.findOneNew(query);
  // }

  async createUserAndProfile(user) {
    return db.sequelize.transaction(async (transaction) => {
      const createdUser = await this.create(user, { transaction });
      const createdProfile = await db.UserProfile.create(
        { ...user.profile, userId: createdUser.id },
        { transaction }
      );

      let leaveArr = [
        "Annual Leave",
        "Casual Leave",
        "Sick Leave",
        "Unpaid Leave",
      ];
      const leavePromises = leaveArr.map((leave) =>
        db.Leave.create(
          {
            userId: createdUser.id,
            typeOfLeave: leave,
            totalLeaves: constants.maxLeave,
            availableLeaves: constants.maxLeave,
            usedLeaves: constants.minLeave,
            bookedLeaves: constants.minLeave,
          },
          { transaction }
        )
      );

      await Promise.all(leavePromises);

      createdUser.password = undefined;
      return { user: createdUser, profile: createdProfile };
    });
  }

  async getUsers(searchQuery = {}) {
    return this.findAll(searchQuery);
  }

  async updateUserAndProfile(user, id, customQuery) {
    return db.sequelize.transaction(async (transaction) => {
      await this.update(user, { id }, { transaction });
      if (user.profile) {
        await db.UserProfile.update(
          user.profile,
          {
            where: { userId: id },
          },
          { transaction }
        );
      }
      return this.findOneWithInclude(customQuery);
    });
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

  // async getRolePermissions(roleId) {
  //   return db.RolePermission.findAll({
  //     where: { roleId },
  //     include: [
  //       {
  //         model: db.Permission,
  //         as: "Permission",
  //         attributes: ["name"],
  //       },
  //     ],
  //   });
  // }

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

  // async findUserByEmail(email) {
  //   return this.findOneWithInclude(email);
  // }
}

module.exports = new UserRepo();
