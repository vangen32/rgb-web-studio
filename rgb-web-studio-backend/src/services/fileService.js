const File = require("../models/File");
const path = require("path");
const fs = require("fs");

const fileService = {
  uploadFileToFs(file, authorId) {
    try {
      const newDirectory = path.join(__dirname, `../uploads/user_${authorId}`);
      const newPath = path.join(newDirectory, file.originalname);
      if (!fs.existsSync(newDirectory)) {
        fs.mkdirSync(newDirectory, { recursive: true });
      }
      fs.renameSync(file.path, newPath);
      return newPath;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async uploadToDb(newFileData) {
    try {
      const newFile = new File(newFileData);
      await newFile.save();
      return newFile;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getFileInfo(fileId) {
    try {
      const res = await File.findById(fileId).populate({
        path: "user",
        select: "-files",
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  async getFilesByUserId(userId, page = 0, limit = 10) {
    try {
      const res = await File.find({ user: userId })
        .skip(page * limit)
        .limit(limit);
      const amount = await File.find({ user: userId }).countDocuments();
      return {
        files: res,
        totalRecords: amount,
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = fileService;
