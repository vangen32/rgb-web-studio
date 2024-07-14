const Ajv = require("ajv");
const mongoose = require("mongoose");
const ajv = new Ajv();

ajv.addFormat("identifier", {
  type: "string",
  validate: (x) => mongoose.Types.ObjectId.isValid(x),
});

const sharedValidation = {
  isId(data) {
    return {
      isValid: validateUserId(data),
      ...validateUserId,
    };
  },
  isPagination(data) {
    return {
      isValid: validatePaginationData(data),
      ...validatePaginationData,
    };
  },
};

module.exports = sharedValidation;

const validateUserId = ajv.compile({
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "identifier",
      minLength: 24,
      maxLength: 24,
    },
  },
  required: ["id"],
  additionalProperties: true,
});

const validatePaginationData = ajv.compile({
  type: "object",
  properties: {
    page: {
      type: "number",
      minimum: 1,
    },
    limit: {
      type: "number",
      minimum: 1,
    },
  },
  required: ["page"],
  additionalProperties: true,
});
