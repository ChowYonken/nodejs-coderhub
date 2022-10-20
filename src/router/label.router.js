const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, getLabels } = require("../controller/label.controller");

const labelRouter = new Router({ prefix: "/label" });

// 添加标签接口
labelRouter.post("/", verifyAuth, create);

// 获取标签接口
labelRouter.get("/", getLabels);

module.exports = labelRouter;
