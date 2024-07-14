const User = require("../models/User");
const fileService = require("./fileService");
const HttpError = require("../types/httpError");

const userService = {
  async createUser(user) {
    const newUser = new User(user);
    return await newUser.save();
  },
  async uploadFile(newFileData) {
    const newFile = await fileService.uploadToDb(newFileData);
    const res = await User.findByIdAndUpdate(
      newFileData.user,
      {
        $push: { files: newFile._id },
      },
      { new: true },
    ).populate("files");
    return newFile;
  },
  async getUsers(page = 1, limit = 10) {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalUsers = await User.countDocuments();
    return {
      users: users?.map((x) => x.toJSON()),
      totalRecords: totalUsers,
    };
  },
  async getUser(userId) {
    let user = await User.findById(userId);
    if (!user) {
      throw new HttpError("User not found", 400);
    }
    return user.toJSON();
  },
};

module.exports = userService;
