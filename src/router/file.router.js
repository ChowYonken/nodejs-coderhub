const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandle,
  pictureHandle,
} = require("../middleware/file.middleware");
const {
  saveAvatarInfo,
  savePictureInfo,
} = require("../controller/file.controller");

const fileRouter = new Router({ prefix: "/upload" });

// 上传用户头像
// 1.验证登录 2.上传至服务器
fileRouter.post("/avatar", verifyAuth, avatarHandle, saveAvatarInfo);

// 上传动态配图
fileRouter.post("/picture", verifyAuth, pictureHandle, savePictureInfo);

module.exports = fileRouter;
