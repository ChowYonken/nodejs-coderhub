const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, detail, list } = require("../controller/moment.controller");

const momentRouter = new Router({ prefix: "/moment" });

// 发布动态接口
momentRouter.post("/", verifyAuth, create);

// 获取单个动态接口
momentRouter.get("/:momentId", detail);

// 获得动态列表接口
momentRouter.get("/", list);

module.exports = momentRouter;
