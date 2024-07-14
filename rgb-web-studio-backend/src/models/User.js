const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true },
);

userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    //ret.files = ret.files.toJSON()
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

module.exports = mongoose.model("User", userSchema);
