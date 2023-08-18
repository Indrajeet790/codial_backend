const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const Avatar_path=path.join("/uploads")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// multer
// The disk storage engine gives  full control on storing files to disk.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  return  cb(null, path.join(__dirname,"..",Avatar_path));
  },
  filename: function (req, file, cb) {
    return cb(null, file.fieldname +"-" +Date.now());
    // return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// static
// userSchema.statics.uploadedAvatar = multer({ storage: storage }).single("avatar");
userSchema.statics.upload = multer({ storage: storage }).single("avatar");
userSchema.statics.avatar_path=Avatar_path;

const User = mongoose.model("User", userSchema);
module.exports = User;
