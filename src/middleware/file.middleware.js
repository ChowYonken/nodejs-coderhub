const Multer = require("koa-multer");
const { AVATAR_PATH } = require("../constants/file-path");

const avatarUpload = Multer({
  dest: "AVATAR_PATH",
});

const avatarHandle = avatarUpload.single("avatar");

module.exports = {
  avatarHandle,
};
