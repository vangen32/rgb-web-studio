const express = require("express");
const userController = express.Router();
const userService = require("../services/userService");
const userValidation = require("../ajv/user");
const fs = require("fs");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fileService = require("../services/fileService");
const HttpError = require("../types/httpError");
const sharedValidation = require("../ajv/shared");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

userController.post("/create", async (req, res, next) => {
  try {
    let user = req.body;
    let validation = userValidation.create(user);
    if (validation.isValid) {
      const result = await userService.createUser(user);
      res.json(result.toJSON());
    } else {
      res.status(422).json({
        message: "Invalid request data",
        errors: validation.errors,
      });
    }
  } catch (error) {
    next(error);
  }
});

userController.post(
  "/file-upload/:userId",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const validation = sharedValidation.isId({ id: userId });
      if (!validation.isValid) {
        throw new HttpError('The "id" parameter is missing or invalid', 400);
      }
      const user = await userService.getUser(userId);
      if (!user) throw new HttpError("Invalid user ID, user is not exist", 400);

      const file = req.file;
      if (!file || file.mimetype !== "application/pdf") {
        throw new HttpError("Only .pdf files are allowed!", 400);
      }

      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);

      const newPath = fileService.uploadFileToFs(file, userId);
      const newFileData = {
        filename: file.originalname,
        size: file.size,
        pages: data.numpages,
        format: file.mimetype,
        path: newPath,
        user: userId,
      };

      const newFile = await userService.uploadFile(newFileData);
      res.json(newFile);
    } catch (error) {
      next(error);
    }
  },
);

userController.get("/list", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await userService.getUsers(page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

userController.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const validation = sharedValidation.isId({ id: userId });
    if (!validation.isValid) {
      throw new HttpError('The "id" parameter is missing or invalid', 400);
    }
    const result = await userService.getUser(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = userController;
