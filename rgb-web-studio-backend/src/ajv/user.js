const Ajv = require("ajv");
const mongoose = require("mongoose");
const ajv = new Ajv();

ajv.addFormat("identifier", {
  type: "string",
  validate: (x) => mongoose.Types.ObjectId.isValid(x),
});

const userValidation = {
  create(data) {
    return {
      isValid: validateUserCreation(data),
      ...validateUserCreation,
    };
  },
};

module.exports = userValidation;

const createUserSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
  },
  required: ["name"],
  additionalProperties: false,
};
const validateUserCreation = ajv.compile(createUserSchema);
