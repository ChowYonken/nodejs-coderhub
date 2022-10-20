const Multer = require("koa-multer");

const avatarUpload = Multer({
  dest: "./uploads/avatar",
});

const avatarHandle = avatarUpload.single("avatar");

module.exports = {
  avatarHandle,
};
