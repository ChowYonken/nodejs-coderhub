const Router = require("koa-router");
const { create } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { avatarInfo } = require("../controller/file.controller");

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/", verifyUser, handlePassword, create);

// 获取用户头像信息
userRouter.get("/:userId/avatar", avatarInfo);

module.exports = userRouter;
