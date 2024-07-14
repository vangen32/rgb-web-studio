const express = require("express");
const fileController = express.Router();
const fileService = require("../services/fileService");
const HttpError = require("../types/httpError");
const sharedValidation = require("../ajv/shared");

fileController.get("/:id", async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const validation = sharedValidation.isId({ id: fileId });
    if (!validation.isValid) {
      throw new HttpError('The "id" parameter is missing or invalid', 400);
    }
    const result = await fileService.getFileInfo(fileId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

fileController.get("/list/user/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const validation = sharedValidation.isId({ id: userId });

    if (!validation.isValid) {
      throw new HttpError('The "id" parameter is missing or invalid', 400);
    }
    const page = parseInt(req.query?.page ?? 1, 10);
    const limit = parseInt(req.query?.limit ?? 10, 10);
    const isPagination = sharedValidation.isPagination({ page, limit });

    if (!isPagination.isValid) {
      throw new HttpError(
        `The pagination parameter is missing or invalid ${isPagination.errors}`,
        400,
      );
    }
    const result = await fileService.getFilesByUserId(userId, page - 1, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = fileController;
