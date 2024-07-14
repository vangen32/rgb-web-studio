const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    pages: { type: Number, required: true },
    format: { type: String, required: true },
    path: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

fileSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.path;
    return ret;
  },
};

module.exports = mongoose.model("File", fileSchema);
