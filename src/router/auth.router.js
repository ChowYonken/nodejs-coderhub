const Router = require("koa-router");
const { login, success } = require("../controller/auth.controller");
const { verifyUser, verifyAuth } = require("../middleware/auth.middleware");

const authRouter = new Router();

authRouter.post("/login", verifyUser, login);
// 登录验证
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;
